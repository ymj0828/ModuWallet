import PageHeader from '@/components/common/PageHeader';
import SendUserList from '@/components/send/SendUserList';

const SendPage = () => {
  return (
    <>
      <PageHeader title="계좌 이체" />
      <p className="text-black-to-white text-[30px] font-bold">누구에게 보낼까요?</p>
      <hr className="border-black-to-white my-[32px]" />
      <SendUserList />
    </>
  );
};

export default SendPage;
