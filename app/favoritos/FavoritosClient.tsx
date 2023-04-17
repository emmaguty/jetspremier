import { SafeJets, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import JetsCard from "@/app/components/Jets/JetsCard";

interface FavoritesClientProps {
    jets: SafeJets[],
    currentUser?: SafeUser | null,
  }

const FavoritosClient: React.FC<FavoritesClientProps> = ({
    jets,
    currentUser
}) => {
  return (
    <Container>
        <Heading
        title="Favoritos"
        subtitle="Lista de tus reservaciones favoritas"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2
                     md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                     2xl:grid-cols-6 gap-8">
            {jets.map((jet: any) => (
                <JetsCard 
                    key={jet.id}
                    currentUser={currentUser}
                    data={jet}
                />
            ))}
      </div>
    </Container>
  )
}

export default FavoritosClient