import { ChangeEvent, useEffect, useState } from 'react';

import { getBalance, sendMoney } from '@/services/wallet.service';

export const useAmountTransfer = (
  uid: string | undefined,
  toUid: string | null,
  toName: string
) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!uid) return;

    const fetchBalance = async () => {
      const balance = await getBalance(uid);
      setBalance(balance);
    };

    fetchBalance();
  }, [uid]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    // 숫자만 허용
    if (!/^\d*$/.test(raw)) return;

    // 빈 문자열은 유지하고 빈 문자열이 아니면 숫자로 바꾼 후(앞자리 0 제거 위함) 문자열로 변환
    const cleaned = raw === '' ? '' : String(Number(raw));

    // 입력값이 잔액을 초과하면 잔액으로 고정하고 그렇지 않으면 입력값 그대로 저장
    if (balance !== null && Number(cleaned) > balance) {
      setAmount(String(balance));
    } else {
      setAmount(cleaned);
    }
  };

  const handleAddAmount = (value: number) => {
    const current = Number(amount) || 0;

    // 클릭한 버튼의 값 더하기
    const newAmount = current + value;

    setAmount(String(newAmount));
  };

  const handleSendSubmit = async () => {
    if (!uid || !toUid || !balance) return;

    const numericAmount = Number(amount);

    await sendMoney(uid, toUid, numericAmount);

    // 이체 확인 페이지에 이체 정보를 전달하기 위해 로컬스토리지에 저장
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
    handleSendSubmit,
    handleInputChange,
    handleAddAmount,
  };
};
