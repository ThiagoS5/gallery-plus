import type { Album } from "../contexts/albums/models/album";
import type { Photo } from "../contexts/photos/models/photo";

export const MOCK_ALBUM_NATUREZA: Album = { id: "a1", title: "Natureza" };
export const MOCK_ALBUM_VIAGEM: Album = { id: "a2", title: "Viagem" };
export const MOCK_ALBUM_ANIMAIS: Album = { id: "a3", title: "Animais" };
export const MOCK_ALBUMS_LIST: Album[] = [
  MOCK_ALBUM_NATUREZA,
  MOCK_ALBUM_VIAGEM,
  MOCK_ALBUM_ANIMAIS,
  { id: "a4", title: "Arte" },
  { id: "a5", title: "Família" },
];
export const MOCK_PHOTO_PRAIA: Photo = {
  id: "p1",
  title: "Pôr do sol na praia",
  imageId: "portrait-tree.png",
  albums: [MOCK_ALBUM_NATUREZA, MOCK_ALBUM_VIAGEM],
};

export const MOCK_PHOTO_GATO: Photo = {
  id: "p2",
  title: "Gato no telhado",
  imageId: "wide-cafeteria.png",
  albums: [MOCK_ALBUM_ANIMAIS],
};

export const MOCK_PHOTO_CAFE: Photo = {
  id: "p3",
  title: "Café da manhã",
  imageId: "wide-car.png",
  albums: [],
};
export const MOCK_PHOTOS_LIST: Photo[] = [
  MOCK_PHOTO_PRAIA,
  MOCK_PHOTO_GATO,
  MOCK_PHOTO_CAFE,
];
