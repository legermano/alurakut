import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { CardsBox } from '../src/components/CardsBox';

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

export default function Home() {
  const githubUser = 'legermano';
  const pessoasFavoritas = [
    {id:'1',title:'juunegreiros',image:'https://github.com/juunegreiros.png'},
    {id:'2',title:'omariosouto',image:'https://github.com/omariosouto.png'},
    {id:'3',title:'peas',image:'https://github.com/peas.png'},
    {id:'4',title:'algocompretto',image:'https://github.com/algocompretto.png'}
  ];
  const [comunidades, setComunidades] = React.useState([{
    id: '12312312312',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);

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

              const comunidade = {
                id: new Date().toISOString,
                title: formData.get('title'),
                image: formData.get('image')
                //? Random image
                // image: 'https://picsum.photos/300?'+Math.floor(Math.random() * 10000)
              }

              setComunidades([...comunidades,comunidade])
              console.log(comunidades);
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
        <CardsBox boxName={'Comunidades'} itemsList={comunidades} />
        <CardsBox boxName={'Pessoas da comunidade'} itemsList={pessoasFavoritas} />
      </div>
    </MainGrid>
    </>
  )
}
