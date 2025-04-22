import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Search = () => {
  return (
    <div>
      <Input placeholder="검색어를 입력하세요." />
      <Button>검색</Button>
    </div>
  );
};

export default Search;
