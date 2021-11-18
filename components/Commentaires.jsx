import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';

import { getComments } from '../services';

const Commentaires = ({ slug }) => {
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setCommentaires(result);
    });
  }, []);

  return (
    <>
      {commentaires.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {commentaires.length}
            {' '}
            Commentaires
          </h3>
            {commentaires.map((commentaire, index) => (
              <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                <p className="mb-4">
                  <span className="font-semibold">{commentaire.nom}</span>
                  {' '}
                  on
                  {' '}
                  {moment(commentaire.createdAt).format('MMM DD, YYYY')}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">{parse(commentaire.comment)}</p>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Commentaires;