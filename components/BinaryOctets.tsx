type BinaryOctetsProps = {
  binary: string;
};

export default function BinaryOctets({ binary }: BinaryOctetsProps) {
  const octets = binary.split(".");

  return (
    <div>
      {octets.map((octet, index) => (
        <span key={index}>
          {octet}
          {index < octets.length - 1 && "."}
        </span>
      ))}
    </div>
  );
}