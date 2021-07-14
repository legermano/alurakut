import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

export function CardsBox({ title, itemsList }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({itemsList.length})
      </h2>

      <ul>
        {
          itemsList.slice(0,6).map((item) => {
            return (
              <li key={new Date().toISOString}>
                <a href={`/users/${item.title}`}>
                  <img src={item.image}/>
                  <span>{item.title}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}