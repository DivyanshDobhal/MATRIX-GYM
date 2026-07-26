import firebaseAdmin from '../config/firebase.js';

class FirebaseService {
  /**
   * Verifies Firebase ID Token
   * @param {string} idToken 
   * @returns {Promise<Object>} Decoded user token payload
   */
  async verifyIdToken(idToken) {
    if (!firebaseAdmin) {
      console.warn('[Firebase Service] Firebase Admin not initialized. Running mock verification for testing.');
      // Return mock user if credentials aren't initialized (for local testing purposes)
      if (process.env.NODE_ENV === 'development') {
        return {
          uid: 'mock-user-12345',
          email: 'gym-member@example.com',
          name: 'Gym Member Test',
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
        };
      }
      throw new Error('Firebase Authentication is not configured on this server.');
    }

    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('[Firebase Service] Token verification failed:', error.message);
      throw error;
    }
  }
}

export default new FirebaseService();
