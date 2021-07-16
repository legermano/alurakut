import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

export function CardsBox({ title, link, itemsList }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({itemsList.length})
      </h2>

      <ul>
        {
          itemsList.slice(0,6).map((item) => {
            return (
              <li key={item.id}>
                <a href={`${link}/${item.id}`}>
                  <img src={item.imageUrl}/>
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