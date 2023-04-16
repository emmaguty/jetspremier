import getCurrentUser from "@/app/actions/getCurrentUser";
import getJetById from "@/app/actions/getJetById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import JetClient from "./JetClient";

interface IParams {
  jetId?: string;
}

const Jetpage = async ({ params }: { params: IParams }) => {

  const jet = await getJetById(params);
  const currentUser = await getCurrentUser();

  if (!jet) {
    return (
        <ClientOnly>
            <EmptyState />
        </ClientOnly>
    )
}

  return (
    <ClientOnly>
      <JetClient 
        jet={jet}
        // reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default Jetpage;