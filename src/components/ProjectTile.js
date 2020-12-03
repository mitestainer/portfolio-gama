import {DiHtml5, DiJsBadge, DiCss3} from 'react-icons/di'
import {SiTypescript} from 'react-icons/si'
import fixDate from '../utils/fixDate'
import './ProjectTile.css'

const ProjectTile = ({url, name, description, language, lastUpdate}) => {
    const getIcon = lang => {
        switch (lang) {
            case 'HTML':
                return <DiHtml5 />
            case 'JavaScript':
                return <DiJsBadge />
            case 'TypeScript':
                return <SiTypescript />
            case 'CSS':
                return <DiCss3 />
            default:
                return
        }
    }
    return (
        <div className={`project lang-${language}`}>
            <a href={url} target="_blank" rel="noopener noreferrer"><strong>{name}</strong></a>
            <p>{description}</p>
            <div className="lang-updated">
                <span className="language">
                    {getIcon(language)}
                </span>
                <span className="updated-at">Last update: {fixDate(lastUpdate)}.</span>
            </div>
        </div>
    )
}

export default ProjectTile