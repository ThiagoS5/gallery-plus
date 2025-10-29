import Container from "../components/atom/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "1", title: "Natureza" },
          { id: "2", title: "Viagem" },
          { id: "3", title: "Animais" },
          { id: "4", title: "Arte" },
        ]}
        className="mb-9"
      />
      <PhotosList
        photos={[
          {
            id: "1",
            title: "Pôr do sol na praia",
            imageId: "portrait-tree.png",
            albums: [
              { id: "1", title: "tree" },
              { id: "a2", title: "Paisagens" },
            ],
          },
          {
            id: "p2",
            title: "Gato no telhado",
            imageId: "portrait-tree.png",
            albums: [{ id: "a3", title: "Animais" }],
          },
          {
            id: "p3",
            title: "Café da manhã",
            imageId: "portrait-tree.png",
            albums: [],
          },
        ]}
      />
    </Container>
  );
}
