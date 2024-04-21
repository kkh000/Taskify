'use client';

import { useState } from 'react';

import Image from 'next/image';

import EditColumnModal from 'components/Modal/EditColumnModal';
import { I_DashboardTitle } from 'interface/Dashboard';
import { setAccessToken, getAccessToken } from 'utils/handleToken';

import NumberChip from '../../common/Chip/NumberChip';
import { ELLIPSE, SETTING } from '../constants';

const ColumnTitle = ({ title, count, columnId, dashboardId }: I_DashboardTitle) => {
  const [isToggledEditColumnMdoal, setIsToggledEditColumnModal] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);
  const [inputValue, setInputValue] = useState(title);

  const handleToggledEditColumnModal = () => {
    setIsToggledEditColumnModal(!isToggledEditColumnMdoal);
  };

  const handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setNewColumnTitle(target);
  };

  const handleChangeNewTitle = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    if (newColumnTitle.trim() === '') {
      alert('값을 입력해주세요.');
      return;
    }

    try {
      const accessToken = getAccessToken();
      const checkDuplicateResponse = await fetch(
        `https://sp-taskify-api.vercel.app/4-14/columns?dashboardId=${dashboardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const responseData = await checkDuplicateResponse.json();
      const checkDuplicate = responseData.data;

      const isDuplicateTitle = checkDuplicate.some(column => column.title === newColumnTitle);

      if (isDuplicateTitle) {
        alert('중복된 컬럼 이름입니다');
        return;
      }

      const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newColumnTitle,
        }),
      });

      if (response.ok) {
        handleToggledEditColumnModal();
      }
    } catch (error) {
      console.error(error);
    }
    setInputValue(newColumnTitle);
    handleToggledEditColumnModal();
  };

  const handleModalClose = () => {
    setNewColumnTitle(inputValue);
    handleToggledEditColumnModal();
  };

  const hanldeColumnDelete = async () => {
    setAccessToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc2NCwidGVhbUlkIjoiNC0xNCIsImlhdCI6MTcxMzUzNDk0NCwiaXNzIjoic3AtdGFza2lmeSJ9.o5wp3rAonlrxZUKvldFhQWQdIsGksFE8A1qusxMXlpA'
    );
    if (window.confirm('컬럼의 모든 카드가 삭제됩니다')) {
      try {
        const accessToken = getAccessToken();
        const response = await fetch(`https://sp-taskify-api.vercel.app/4-14/columns/${columnId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          handleToggledEditColumnModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex justify-between items-center '>
      <div className='flex items-center gap-3  text-lg font-bold'>
        <Image src={ELLIPSE} alt='ellipse' width={8} height={8} />
        <div className='text-lg text-tp-black_700'>{inputValue}</div>
        <NumberChip count={count} />
      </div>
      <Image src={SETTING} alt='setting' width={24} height={24} onClick={handleToggledEditColumnModal} />
      {isToggledEditColumnMdoal && (
        <EditColumnModal
          handleModal={handleModalClose}
          title='컬럼 관리'
          placeholder='이름을 입력해 주세요.'
          value={newColumnTitle}
          onChange={handleChangeInputValue}
          onClickFirstButton={handleModalClose}
          onClickSecondButton={handleChangeNewTitle}
          onClick={hanldeColumnDelete}
        />
      )}
    </div>
  );
};

export default ColumnTitle;
