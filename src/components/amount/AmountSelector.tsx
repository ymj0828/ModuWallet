import { ChangeEvent } from 'react';

interface Props {
  balance: number | null;
  amount: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddAmount: (value: number) => void;
}

const PRESET_AMOUNTS = [1000, 10000, 50000, 100000];

const AmountSelector = ({ balance, amount, onInputChange, onAddAmount }: Props) => {
  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="금액을 입력하세요"
        value={amount}
        onChange={onInputChange}
        className="mb-3 w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-center text-lg text-black-to-white focus-visible:border-gray-400 focus-visible:outline-none"
      />

      <p className="mb-6 text-lg text-black-to-white">
        출금가능금액 {balance?.toLocaleString() ?? '...'}원
      </p>

      <div className="mb-12 grid grid-cols-2 gap-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => onAddAmount(amt)}
            className="h-12 rounded-lg border border-primary bg-white-to-black py-2 text-lg font-medium text-primary hover:bg-primary-400 disabled:bg-white-to-black disabled:opacity-40"
            disabled={balance !== null && Number(amount) + amt > balance}
          >
            +{amt.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AmountSelector;
