import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

export function CardsBox({ boxName, itemsList }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {boxName} ({itemsList.length})
      </h2>

      <ul>
        {
          itemsList.slice(0,6).map((item) => {
            return (
              <li key={item.key}>
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