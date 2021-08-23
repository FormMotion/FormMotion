import axios from 'axios';

export const SAVE_IMAGE = 'SAVE_IMAGE';

// export const getImage = (image) => ({
//   type: SAVE_IMAGE,
//   image,
// });

export const saveImageThunk = (dataUrl) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/images', { dataUrl });

      // dispatch(getImage(data));
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports;
