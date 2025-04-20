import { ChangeEvent } from 'react';

interface Props {
  balance: number | null;
  amount: string;
  error: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddAmount: (value: number) => void;
}

const PRESET_AMOUNTS = [1000, 10000, 50000, 100000];

const AmountSelector = ({
  balance,
  amount,
  error,
  onInputChange,
  onAddAmount,
}: Props) => {
  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="금액을 입력하세요"
        value={amount}
        onChange={onInputChange}
        className="mb-3 w-full rounded-lg border p-3 text-center text-lg focus-visible:outline-none"
      />

      <p className="text-black-to-white mb-6 text-lg">
        출금가능금액 {balance?.toLocaleString() ?? '...'}원
      </p>

      <div className="mb-12 grid grid-cols-2 gap-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => onAddAmount(amt)}
            className="hover:bg-primary-50 bg-white-to-black disabled:bg-white-to-black rounded-lg border border-primary py-2 text-lg font-medium text-primary disabled:opacity-40"
            disabled={balance !== null && Number(amount) + amt > balance}
          >
            +{amt.toLocaleString()}
          </button>
        ))}
      </div>

      {error && <p className="mb-2 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default AmountSelector;
