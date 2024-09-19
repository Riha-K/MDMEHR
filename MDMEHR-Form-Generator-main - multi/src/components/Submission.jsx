export default function FileUploadPage({
    archetype,
  setArchetype,
  archetypeLoaded,
  setArchetypeLoaded,
}) {
    const data = JSON.stringify(archetype, null, 2);
    return <pre>{data}</pre>;
}