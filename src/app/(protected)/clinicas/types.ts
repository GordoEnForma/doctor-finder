export type Slot = {
  id: number;
  time: string;
  cost: number;
  doctorId: number;
};

export type Doctor = {
  id: string;
  name: string;
  image: string | null;
  sex: "M" | "F";
  clinicaName: string | null;
  especialidadName: string | null;
};
