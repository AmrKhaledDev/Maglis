function NameDescription({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-sm">{name}</h2>
      <p className="text-xs text-gray-400 line-clamp-1">{description}</p>
    </div>
  );
}

export default NameDescription;
