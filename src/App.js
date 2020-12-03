import { useEffect, useState } from 'react'
import ProjectTile from './components/ProjectTile'
import axios from 'axios'
import {AiOutlineDown} from 'react-icons/ai'
import {FaLinkedin, FaGithubSquare} from 'react-icons/fa'
import profileImg from './images/profile.jpg'
import './App.css'

function App() {

  const [repos, setRepos] = useState([])
  const [outdatedRepos, setOutdatedRepos] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('https://api.github.com/users/mitestainer/repos?type=all&sort=updated&direction=desc')
    .then(res => {
      const repos = []
      const outdatedRepos = []
      res.data.forEach(repo => {
        const threshold = new Date('Jan 01 2019')
        const lastUpdate = new Date(repo.updated_at)
        if (lastUpdate.getTime() < threshold.getTime()) {
          outdatedRepos.push(repo)
        } else {
          repos.push(repo)
        }
      })
      setOutdatedRepos(outdatedRepos)
      setRepos(repos)
      setIsLoading(false)
    })
  }, [])

  const toggle = () => setIsOpen(!isOpen)

  return isLoading ? <p>Loading...</p> : (
    <div className="App">
      <aside>
        <img src={profileImg} alt="This is me" />
        <div>
          <p>Matheus Mitestainer</p>
          <p>A developer</p>
          <p><em>I build things.</em></p>
          <div>
            <a href="https://linkedin.com/in/mitestainer/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/mitestainer/" target="_blank" rel="noopener noreferrer">
              <FaGithubSquare />
            </a>
          </div>
        </div>
      </aside>
      <section>
        <h1>My work</h1>
        <p>Simple showcase of my Gama Experience #36 assignments, as well as my personal projects.</p>
        <div className="projects">
          {repos.map(repo => <ProjectTile key={repo.id} url={repo.html_url} name={repo.name} description={repo.description} language={repo.language} lastUpdate={repo.updated_at} />)}
        </div>
        <div id="outdated">
          <p onClick={toggle}>Show outdated projects ({outdatedRepos.length}) <AiOutlineDown /></p>
          <div className={`outdated-wrapper ${isOpen ? 'open' : 'closed'}`}>
            <p>These projects have not been updated for a long time and I don't plan to work on them in the short term. I like to compare these projects with my current ones and see how much I improved so far. Feel free to do the same.</p>
            <div className="projects">
              {outdatedRepos.map(repo => <ProjectTile key={repo.id} url={repo.html_url} name={repo.name} description={repo.description} language={repo.language} lastUpdate={repo.updated_at} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
