import Container from "../components/atom/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";
import { MOCK_ALBUMS_LIST, MOCK_PHOTOS_LIST } from "../mocks/data";
export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter albums={MOCK_ALBUMS_LIST} className="mb-9" />
      <PhotosList photos={MOCK_PHOTOS_LIST} />
    </Container>
  );
}
