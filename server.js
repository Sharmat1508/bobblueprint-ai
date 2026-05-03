import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { CloudantV1 } from '@ibm-cloud/cloudant'
import { IamAuthenticator } from 'ibm-cloud-sdk-core'

dotenv.config()

const app = express()
const PORT = 5050
const DB_NAME = 'bobblueprint-final'

app.use(cors())
app.use(express.json())

const cloudant = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_APIKEY,
  }),
  serviceUrl: process.env.CLOUDANT_URL,
})

async function getIBMAccessToken() {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
      apikey: process.env.IBM_API_KEY,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to get IBM access token: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  return data.access_token
}

async function ensureCloudantDatabase() {
  try {
    await cloudant.putDatabase({ db: DB_NAME })
    console.log(`Cloudant database created: ${DB_NAME}`)
  } catch (error) {
    if (error.status === 412 || error.code === 412) {
      return
    }

    console.log('Cloudant database warning:', error.message)
  }
}

async function saveBlueprintToCloudant({ idea, output }) {
  try {
    await ensureCloudantDatabase()

    await cloudant.postDocument({
      db: DB_NAME,
      document: {
        type: 'blueprint',
        idea,
        output,
        model: process.env.IBM_MODEL_ID,
        source: 'watsonx.ai',
        appName: 'BobBlueprint-Final',
        createdAt: new Date().toISOString(),
      },
    })

    console.log('Blueprint saved to Cloudant.')
  } catch (error) {
    console.log('Cloudant save warning:', error.message)
  }
}

function buildPrompt(projectIdea) {
  return `
You are BobBlueprint, an AI-powered project launch assistant for beginner developers.

Turn this project idea into a polished, beginner-friendly, GitHub-ready project blueprint.

Project idea:
${projectIdea}

Return the answer in this exact structure:

PROJECT TITLE:
A short polished project name.

PROJECT SUMMARY:
A 2-3 sentence explanation of what the project does.

PROBLEM STATEMENT:
Explain the problem this project solves.

TARGET USERS:
- List 3-5 target users.

MVP FEATURES:
- List 5 beginner-friendly features.

BEGINNER BUILD ROADMAP:
- Give 5 clear build steps.

SUGGESTED FOLDER STRUCTURE:
- Suggest simple folders/files for a React project.

IBM BOB PROMPT PACK:
- Give 5 copy-ready prompts for IBM Bob:
  1. Planning prompt
  2. Coding prompt
  3. Debugging prompt
  4. UI review prompt
  5. README/demo prompt

README STARTER:
Write a short GitHub README starter.

DEMO CHECKLIST:
- List what to show in a 3-minute hackathon demo.

Keep it practical, clear, polished, and beginner-friendly.
`
}

app.get('/', (req, res) => {
  res.send('BobBlueprint backend is running. Use POST /api/blueprint, GET /api/models, or GET /api/history.')
})

app.get('/api/models', async (req, res) => {
  try {
    const accessToken = await getIBMAccessToken()

    const response = await fetch(
      `${process.env.IBM_WATSONX_URL}/ml/v1/foundation_model_specs?version=2023-05-29`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch models',
        status: response.status,
        details: data,
      })
    }

    const modelIds = data.resources
      ?.map((model) => model.model_id)
      ?.filter(Boolean)

    const graniteModels = modelIds?.filter((id) =>
      id.toLowerCase().includes('granite')
    )

    res.json({
      count: modelIds?.length || 0,
      graniteModels,
      models: modelIds,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Server error',
    })
  }
})

app.get('/api/history', async (req, res) => {
  try {
    await ensureCloudantDatabase()

    const response = await cloudant.postAllDocs({
      db: DB_NAME,
      includeDocs: true,
      limit: 10,
      descending: true,
    })

    const blueprints = response.result.rows
      .map((row) => row.doc)
      .filter((doc) => doc?.type === 'blueprint')

    res.json({ blueprints })
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Failed to fetch Cloudant history.',
    })
  }
})

app.post('/api/blueprint', async (req, res) => {
  try {
    const { idea } = req.body

    if (!idea || idea.trim().length === 0) {
      return res.status(400).json({ error: 'Project idea is required.' })
    }

    const accessToken = await getIBMAccessToken()

    const response = await fetch(
      `${process.env.IBM_WATSONX_URL}/ml/v1/text/generation?version=2023-05-29`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          model_id: process.env.IBM_MODEL_ID,
          project_id: process.env.IBM_PROJECT_ID,
          input: buildPrompt(idea),
          parameters: {
            decoding_method: 'greedy',
            max_new_tokens: 900,
            min_new_tokens: 100,
            temperature: 0.4,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'watsonx.ai request failed',
        status: response.status,
        details: data,
      })
    }

    const generatedOutput = data.results?.[0]?.generated_text || 'No response generated.'

    await saveBlueprintToCloudant({
      idea,
      output: generatedOutput,
    })

    res.json({
      output: generatedOutput,
      savedToCloudant: true,
    })
  } catch (error) {
    res.status(500).json({
      error: error.message || 'Server error',
    })
  }
})

app.listen(PORT, () => {
  console.log(`BobBlueprint backend running on http://localhost:${PORT}`)
})