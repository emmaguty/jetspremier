import getJets, { IJetsParams } from "./actions/getJets";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Container from "./components/Container/Container";
import JetsCard from "./components/Jets/JetsCard";
import getCurrentUser from "./actions/getCurrentUser";
import JetCard from "./components/Jets/JetsCard";

interface HomeProps {
  searchParams: IJetsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const jets = await getJets(searchParams);
  const currentUser = await getCurrentUser();

  if (jets.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8">
          {jets.map((jet) => {
            return (
              <JetCard 
                currentUser={currentUser} 
                key={jet.id}
                data={jet}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}


export default Home;
