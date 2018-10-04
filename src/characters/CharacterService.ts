import { db } from '../firebase';
import sessionService from '../SessionService';

class CharacterService {
  public getCharacters(): Promise<ICharacter[]> {
    return db.collection('characters')
      .where('userId', '==', sessionService.getUserId())
      .get()
      .then( querySnapshot => querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}) as ICharacter))
      .catch(() => []);
  }

  public getCharacter(id: string): Promise<ICharacter> {
    return db.collection('characters')
      .doc(id)
      .get()
      .then(doc => ({...doc.data(), id: doc.id}) as ICharacter);
  }

  public updateCharacter(characterInfo: ICharacter): Promise<void> {
    const {id, ...data} = characterInfo;

    return db.collection('characters')
      .doc(id)
      .set(data);
  }

  public addCharacter(characterInfo: ICharacter): Promise<string> {
    return db.collection('characters')
      .add({...characterInfo, userId: sessionService.getUserId()})
      .then(doc => doc.id);
  }
}

export interface ICharacter {
  id?: string;
  name?: string;
  background?: string;
  description?: string;
  userId?: string;
}

export const characterService = new CharacterService();