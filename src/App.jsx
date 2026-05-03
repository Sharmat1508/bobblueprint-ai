import { useState } from 'react'
import './App.css'

function App() {
  const [idea, setIdea] = useState('I want to build a job application tracker for students.')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedToCloudant, setSavedToCloudant] = useState(false)

  async function generateBlueprint() {
    setLoading(true)
    setError('')
    setOutput('')
    setSavedToCloudant(false)

    try {
      const response = await fetch('http://localhost:5050/api/blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.')
      }

      const cleanOutput = data.output
        .replaceAll('```', '')
        .replace(/\n{4,}/g, '\n\n')

      setOutput(`${cleanOutput}\n\n✅ Saved to IBM Cloudant blueprint history.`)
      setSavedToCloudant(true)
    } catch (err) {
      setError(err.message || 'Could not generate blueprint.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="brand-mark">B</div>
          <div>
            <strong>BobBlueprint AI</strong>
            <span>Powered by IBM Bob + watsonx.ai</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#demo">Live Demo</a>
          <a href="#workflow">Workflow</a>
          <a href="#architecture">Architecture</a>
        </div>
      </nav>

      <main>
        <section className="hero hero-hero">
          <div className="hero-copy">
            <p className="eyebrow">AI launch assistant for beginner developers</p>
            <h1>Turn rough ideas into GitHub-ready project blueprints</h1>
            <p className="hero-text">
              BobBlueprint AI helps beginner developers plan, build, debug, document, and demo projects faster using IBM Bob and watsonx.ai.
            </p>

            <div className="hero-actions">
              <a href="#demo" className="primary-button">Try Live Demo →</a>
              <a href="#workflow" className="secondary-button">View Workflow</a>
            </div>
          </div>

          <div className="metrics-grid">
            <div className="metric-card">
              <span>2 IBM Services Used</span>
              <strong>IBM Bob + watsonx.ai</strong>
            </div>
            <div className="metric-card">
              <span>60s Blueprint Time</span>
              <strong>Fast idea-to-plan flow</strong>
            </div>
            <div className="metric-card">
              <span>5 Bob Prompts Generated</span>
              <strong>Ready for coding & demo</strong>
            </div>
            <div className="metric-card">
              <span>Cloudant Saved History</span>
              <strong>Persisted project drafts</strong>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="trust-pill">IBM Bob</div>
          <div className="trust-pill">watsonx.ai Runtime</div>
          <div className="trust-pill">IBM Cloudant</div>
          <div className="trust-pill">React</div>
          <div className="trust-pill">Express</div>
        </section>

        <section className="section" id="features">
          <div className="section-heading">
            <p className="eyebrow">What BobBlueprint AI creates</p>
            <h2>A complete launch kit for beginner builders.</h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card feature-strong">
              <span>01</span>
              <h3>Project Blueprint</h3>
              <p>Clear problem statement, target users, MVP scope, and solution concept.</p>
            </div>
            <div className="feature-card feature-strong">
              <span>02</span>
              <h3>Build Roadmap</h3>
              <p>Beginner-friendly steps that explain what to build first and why.</p>
            </div>
            <div className="feature-card feature-strong">
              <span>03</span>
              <h3>IBM Bob Prompt Pack</h3>
              <p>Ready-to-copy prompts for coding, debugging, reviewing, and documenting.</p>
            </div>
            <div className="feature-card feature-strong">
              <span>04</span>
              <h3>Demo Checklist</h3>
              <p>A simple 3-minute hackathon demo flow that helps judges understand the project.</p>
            </div>
          </div>
        </section>

        <section className="demo-shell" id="demo">
          <div className="demo-copy">
            <p className="eyebrow">Live AI demo</p>
            <h2>Ask BobBlueprint AI to turn your idea into a build plan.</h2>
            <p>
              Type a beginner project idea and get an AI-generated blueprint powered by watsonx.ai.
            </p>
          </div>

          <div className="demo-card">
            <div className="status-badge">Connected to watsonx.ai + Cloudant</div>

            <label htmlFor="project-idea">Project idea</label>
            <textarea
              id="project-idea"
              rows={5}
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Example: I want to build a job application tracker for students."
            />

            <button className="primary-button demo-button" onClick={generateBlueprint} disabled={loading || idea.trim().length === 0}>
              {loading ? 'Generating with watsonx.ai...' : 'Generate Blueprint'}
            </button>

            {error && <div className="error-box">{error}</div>}

            <div className="response-box">
              {output ? (
                <pre>{output}</pre>
              ) : (
                <p className="empty-state">
                  Your AI-generated project blueprint will appear here.
                </p>
              )}
            </div>

            {savedToCloudant && <div className="saved-note">Saved successfully to Cloudant history.</div>}
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="section-heading">
            <p className="eyebrow">IBM Bob workflow</p>
            <h2>Designed to help beginners build with IBM Bob faster.</h2>
            <p>
              BobBlueprint AI generates structured prompts that can be copied into IBM Bob for planning,
              coding, debugging, UI review, documentation, and hackathon demo preparation.
            </p>
          </div>

          <div className="workflow-cards">
            <div className="workflow-card">Plan project with IBM Bob</div>
            <div className="workflow-card">Generate code safely</div>
            <div className="workflow-card">Debug backend/API issues</div>
            <div className="workflow-card">Improve UI and README</div>
            <div className="workflow-card">Prepare hackathon demo</div>
          </div>
        </section>

        <section className="section architecture-section" id="architecture">
          <div className="section-heading">
            <p className="eyebrow">Architecture</p>
            <h2>Simple flow from idea to saved history.</h2>
          </div>

          <div className="architecture-flow">
            <div className="flow-step">User Idea</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">React UI</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">Express API</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">watsonx.ai</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">Cloudant History</div>
          </div>
        </section>

        <section className="section demo-script" id="demo-script">
          <div className="section-heading">
            <p className="eyebrow">Demo script</p>
            <h2>Show the workflow in three quick steps.</h2>
          </div>

          <div className="script-steps">
            <div className="script-step">
              <strong>1.</strong>
              <p>Enter a project idea in plain English.</p>
            </div>
            <div className="script-step">
              <strong>2.</strong>
              <p>Generate a blueprint with watsonx.ai.</p>
            </div>
            <div className="script-step">
              <strong>3.</strong>
              <p>Explain saved history in Cloudant and the IBM Bob prompt pack.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        Built for IBM Bob Dev Day Hackathon.
      </footer>
    </div>
  )
}

export default App
