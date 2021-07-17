import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons'
import { CardsBox } from '../src/components/CardsBox'

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);

  React.useEffect(function() {
    //Github followers
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then(function (completeResponse) {
      let aFollowers = [];
      completeResponse.map((follower) => {
        aFollowers = [
          ...aFollowers, 
          {
            id: follower.id, 
            title: follower.login, 
            imageUrl: follower.avatar_url
          }
        ]
      });
      setFollowers(aFollowers);
    })

    //DatoCMS
    fetch(
      'https://graphql.datocms.com/', 
      { 
        method: 'POST',
        headers: {
          'Authorization': process.env.NEXT_PUBLIC_DATOCMS_READONLY_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ "query": 
          `query {
            allCommunities {
              id
              title
              imageUrl
              creatorSlug
            }
          }`
        })
      }
    )
    .then((response) => response.json())
    .then((completeResponse) => {
      setCommunities(completeResponse.data.allCommunities);
    })

  }, []);

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem vindo(a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form onSubmit={function handleCreateCommunity(e){
              e.preventDefault();
              const formData = new FormData(e.target);

              const community = {
                id: new Date().toISOString,
                title: formData.get('title'),
                imageUrl: formData.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const data = await response.json();
                setCommunities([...communities,data.createdRegister])
              })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <CardsBox title={'Seguidores'} link={'user'} itemsList={followers} />
        <CardsBox title={'Comunidades'} link={'community'} itemsList={communities} />
      </div>
    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  //Authenticate the token
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((response) => response.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanet: false
      }
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }
  }
}