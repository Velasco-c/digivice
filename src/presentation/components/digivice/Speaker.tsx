export function Speaker() {
  return (
    <div className="speaker" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <span className="speaker__slot" key={index} />
      ))}
    </div>
  );
}
