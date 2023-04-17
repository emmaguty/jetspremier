'use client';

import { useRouter } from "next/navigation";

import Container from "../components/Container/Container";
import Heading from "../components/Heading";
import { SafeUser, SafeJets } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import JetsCard from "../components/Jets/JetsCard";

interface PropertiesClientProps {
  jets: SafeJets[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  jets,
  currentUser
}) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/jets/${id}`)
      .then(() => {
        toast.success('Jet eliminado');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);

  return (
    <Container>
      <Heading
        title="Jets"
        subtitle="Lista de todos los Jets"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2
                      md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                      2xl:grid-cols-6 gap-8">
          {jets.map((jet: any) => (
            <JetsCard
              key={jet.id}
              data={jet}
            />
          ))}

      </div>
    </Container>
  )
}

export default PropertiesClient;