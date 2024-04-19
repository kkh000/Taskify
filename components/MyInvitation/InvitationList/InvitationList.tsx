import { useState, useEffect } from 'react';

import { I_MYInviteList } from '@/interface/myInvitation';

const InvitationList = ({ invitationList, handleAccept, handleReject }: I_MYInviteList) => {
  const [invitationDashboard, setInvitationDashboard] = useState(invitationList);

  useEffect(() => {
    setInvitationDashboard(invitationList);
  }, [invitationList]);

  return (
    <>
      {invitationDashboard.map(({ dashboard, inviter, id }) => (
        <div
          key={id}
          className='mb:hidden tb:grid grid-cols-3 px-7 py-7 text-base border-b-[1px] border-bg-tp-gray_600'>
          <div className='pl-6'>{dashboard.title}</div>
          <div>{inviter.nickname}</div>
          <div className='flex gap-[0.625rem]'>
            <button
              className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
              onClick={() => {
                handleAccept(id);
              }}>
              수락
            </button>
            <button
              className='w-[5.25rem] h-8 text-tp-violet_900 rounded bg-tp-white border boder-solid border-tp-gray_700 text-sm font-medium'
              onClick={() => {
                handleReject(id);
              }}>
              거절
            </button>
          </div>
        </div>
      ))}

      {invitationDashboard.map(({ dashboard, inviter, id }) => (
        <div key={id} className='tb:hidden flex justify-center flex-col gap-4 p-4 border-b-[1px] border-bg-tp-gray_600'>
          <div className='flex flex-col gap-[0.625rem]'>
            <div className='flex gap-4 text-sm'>
              <div className='text-tp-gray_800'>이름</div>
              <div>{dashboard.title}</div>
            </div>
            <div className='flex gap-4 text-sm'>
              <div className='text-tp-gray_800'>초대자</div>
              <div>{inviter.nickname}</div>
            </div>
          </div>
          <div className='flex justify-center items-center gap-[0.625rem]'>
            <button
              className='w-[5.25rem] h-8 bg-tp-violet_900 rounded text-tp-white text-sm font-medium'
              onClick={() => {
                handleAccept(id);
              }}>
              수락
            </button>
            <button
              className='w-[5.25rem] h-8 text-tp-violet_900 rounded bg-tp-white border boder-solid border-tp-gray_700 text-sm font-medium'
              onClick={() => {
                handleReject(id);
              }}>
              거절
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvitationList;