const axios = require('axios');

const API = axios.create({ baseURL: 'http://localhost:3001' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

const signIn = (formData) => API.post('/user/signin', formData);
const signUp = (formData) => API.post('/user/signup', formData);

const fetchCarrier = (id) => API.get(`/carriers/${id}`);
const fetchCarriers = (page) => API.get(`/carriers?page=${page}`);
const fetchCarrierBySearch = (searchQuery) => API.get(`/carriers/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
const createCarrier = (newCarrier) => API.post('/carriers', newCarrier);
const updateCarrier = (id, updatedCarrier) => API.patch(`/carriers/${id}`, updatedCarrier);
const deleteCarrier = (id) => API.delete(`/carriers/${id}`);

const fetchLoad = (id) => API.get(`/loads/${id}`);
const fetchLoads = (page) => API.get(`/loads?page=${page}`);
const fetchLoadBySearch = (searchQuery) => API.get(`/loads/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
const createLoad = (newLoad) => API.post('/loads', newLoad);
const updateLoad = (id, updatedLoad) => API.patch(`/loads/${id}`, updatedLoad);
const deleteLoad = (id) => API.delete(`/loads/${id}`);

const fetchInvoice = (id) => API.get(`/invoices/${id}`);
const fetchInvoices = (page) => API.get(`/invoices?page=${page}`);
const fetchInvoiceBySearch = (searchQuery) => API.get(`/invoices/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
const createInvoice = (newInvoice) => API.post('/invoices', newInvoice);
const updateInvoice = (id, updatedInvoice) => API.patch(`/invoices/${id}`, updatedInvoice);
const deleteInvoice = (id) => API.delete(`/invoices/${id}`);

const fetchPost = (id) => API.get(`/posts/${id}`);
const fetchPosts = (page) => API.get(`/posts?page=${page}`);
const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
const createPost = (newPost) => API.post('/posts', newPost);
const likePost = (id) => API.patch(`/posts/${id}/likePost`);
const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
const deletePost = (id) => API.delete(`/posts/${id}`);

const fetchDraft = (draftDateFrom, draftDateTo) => API.get('/drafts', {
  params: {
    draftDateFrom,
    draftDateTo,
  },
});

// Open AI
const createCompletion = (prompt) => API.post('/queries/create-completion', prompt);
const createEdit = (input, instruction) => API.post('/queries/create-edit', { input, instruction });
const createEmbedding = (input) => API.post('/queries/create-embedding', { input });
const createFile = (filePath) => API.post('/queries/create-file', { filePath });
const listFiles = () => API.get('/queries/list-files');
const deleteFile = (fileId) => API.delete('/queries/delete-file', { data: { fileId } });
const createFineTune = (trainingFile) => API.post('/queries/create-fine-tune', { trainingFile });
const listFineTunes = () => API.get('/queries/list-fine-tunes');
const retrieveFineTune = (fineTuneId) => API.post('/queries/retrieve-fine-tune', { fineTuneId });
const cancelFineTune = (fineTuneId) => API.post('/queries/cancel-fine-tune', { fineTuneId });
const createModeration = (input) => API.post('/queries/create-moderation', { input });
const createImage = (prompt) => API.post('/queries/create-image', { prompt });
const createImageEdit = (imagePath, maskPath, prompt) => API.post('/queries/create-image-edit', { imagePath, maskPath, prompt });
const createImageVariation = (imagePath) => API.post('/queries/create-image-variation', { imagePath });
const createTranscription = (audioPath) => API.post('/queries/create-transcription', { audioPath });
const createTranslation = (audioPath) => API.post('/queries/create-translation', { audioPath });

// Mistral
const createFIMCompletion = (prompt, suffix) => API.post('/queries/create-fim-completion', { prompt, suffix });
const createEmbedding_m = (input) => API.post('/queries/create-embedding', { input });
const createFile_m = (filePath) => API.post('/queries/create-file', { filePath });
const listFiles_m = () => API.get('/queries/list-files');
const deleteFile_m = (fileId) => API.delete('/queries/delete-file', { data: { fileId } });
const createFineTune_m = (trainingFile) => API.post('/queries/create-fine-tune', { trainingFile });
const listFineTunes_m = () => API.get('/queries/list-fine-tunes');
const retrieveFineTune_m = (fineTuneId) => API.post('/queries/retrieve-fine-tune', { fineTuneId });
const cancelFineTune_m = (fineTuneId) => API.post('/queries/cancel-fine-tune', { fineTuneId });

const askQuestion_local = (prompt) => API.post('http://127.0.0.1:5001/api/ask', prompt, {
  headers: {
    'Content-Type': 'application/json'
  }
});

const askQuestion_ec2 = (prompt) => API.post('http://54.244.177.73:8000/api/ask', prompt, {
  headers: {
    'Content-Type': 'application/json'
  }
});

const testDebugRoute = () => API.get('/debug');

module.exports = {
  signIn,
  signUp,
  fetchCarrier,
  fetchCarriers,
  fetchCarrierBySearch,
  createCarrier,
  updateCarrier,
  deleteCarrier,
  fetchLoad,
  fetchLoads,
  fetchLoadBySearch,
  createLoad,
  updateLoad,
  deleteLoad,
  fetchInvoice,
  fetchInvoices,
  fetchInvoiceBySearch,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  fetchPost,
  fetchPosts,
  fetchPostsByCreator,
  fetchPostsBySearch,
  createPost,
  likePost,
  comment,
  updatePost,
  deletePost,
  fetchDraft,
  createCompletion,
  createEdit,
  createEmbedding,
  createFile,
  listFiles,
  deleteFile,
  createFineTune,
  listFineTunes,
  retrieveFineTune,
  cancelFineTune,
  createModeration,
  createImage,
  createImageEdit,
  createImageVariation,
  createTranscription,
  createTranslation,
  createFIMCompletion,
  createEmbedding_m,
  createFile_m,
  listFiles_m,
  deleteFile_m,
  createFineTune_m,
  listFineTunes_m,
  retrieveFineTune_m,
  cancelFineTune_m,
  askQuestion_local,
  askQuestion_ec2,
  testDebugRoute
};