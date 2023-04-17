import { User, Jets, Reservation } from "@prisma/client";

export type SafeJets = Omit<
  Jets,
  "createdAt"
> & {
  createdAt: string;
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "jet"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  jet: SafeJets;
}


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};