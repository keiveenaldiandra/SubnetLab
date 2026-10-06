type SubnetResultPresenterProps = {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
};

export default function SubnetResultPresenter({
  networkAddress,
  broadcastAddress,
  firstHost,
  lastHost,
  totalHosts,
}: SubnetResultPresenterProps) {
  return (
    <div>
      <h2>Hasil Perhitungan</h2>

      <p>
        <strong>Network Address:</strong> {networkAddress}
      </p>

      <p>
        <strong>Broadcast Address:</strong> {broadcastAddress}
      </p>

      <p>
        <strong>First Host:</strong> {firstHost}
      </p>

      <p>
        <strong>Last Host:</strong> {lastHost}
      </p>

      <p>
        <strong>Total Host:</strong> {totalHosts}
      </p>
    </div>
  );
}