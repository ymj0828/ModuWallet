import { ChangeEvent, useEffect, useState } from 'react';

import { sendMoney } from '@/services/transaction.service';
import { getOrInitBalance } from '@/services/wallet.service';

export const useAmountTransfer = (
  uid: string | undefined,
  toUid: string | null,
  toName: string
) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uid) return;
    getOrInitBalance(uid).then(setBalance);
  }, [uid]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // 숫자 외 문자 제거
    if (!/^\d*$/.test(raw)) return;

    // 앞자리 0 제거 (단, 빈 문자열은 허용)
    const cleaned = raw === '' ? '' : String(Number(raw));

    if (balance !== null && Number(cleaned) > balance) {
      setAmount(String(balance));
    } else {
      setAmount(cleaned);
    }
  };

  const handleAddAmount = (value: number) => {
    const current = Number(amount) || 0;
    const next = current + value;

    if (balance !== null && next > balance) return;

    setAmount(String(next));
  };

  const submit = async () => {
    if (!uid || !toUid || !balance) return;

    const numericAmount = Number(amount);

    if (numericAmount > balance) {
      setError('잔액이 부족합니다.');
      return;
    }

    await sendMoney(uid, toUid, numericAmount);
    localStorage.setItem(
      'lastTransfer',
      JSON.stringify({
        toUid,
        toName,
        amount: numericAmount,
        timestamp: new Date().toISOString(),
      })
    );
  };

  return {
    balance,
    amount,
    error,
    submit,
    handleInputChange,
    handleAddAmount,
  };
};
