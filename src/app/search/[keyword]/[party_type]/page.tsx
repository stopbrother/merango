import React from 'react';

interface SearchPageProps {
  params: {
    keyword: string;
    party_type: string;
  };
}

const SearchPage = ({ params }: SearchPageProps) => {
  const { keyword, party_type } = params;

  return <div>page</div>;
};

export default SearchPage;
