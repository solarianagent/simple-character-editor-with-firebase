import * as React from 'react';

import './CharacterForm.css';
import { ICharacter } from './CharacterService';

export class CharacterForm extends React.Component<ICharacterFormProps, {characterUpdates: ICharacter}> {
  constructor(props: ICharacterFormProps) {
    super(props);
    this.state = {characterUpdates: props.characterInfo};
  }

  public componentWillReceiveProps({characterInfo}: ICharacterFormProps) {
    this.setState(({characterUpdates}) => {
      const updates = {...characterInfo, ...characterUpdates};
      return {characterUpdates: updates};
    })
  }

  public updateAttribute = (attrName: string) => (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const attrValue = event.currentTarget.value;

    this.setState(({characterUpdates}) => {
      const updates = {...characterUpdates, [attrName]: attrValue }; 
      return {characterUpdates: updates};
    });
  }

  public saveCharacter = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.onInfoUpdated(this.state.characterUpdates);
    event.preventDefault();
  }

  public render() {
    const {characterUpdates} = this.state;

    return <form className="pure-form pure-form-stacked" onSubmit={this.saveCharacter}>
      <fieldset>
        <label>Name</label>
        <input type="text" value={characterUpdates.name} onChange={this.updateAttribute('name')}/> 

        <label>Background</label>
        <textarea value={characterUpdates.background} onChange={this.updateAttribute('background')}/> 

        <label>Description</label>
        <textarea value={characterUpdates.description} onChange={this.updateAttribute('description')}/> 

        <button className="pure-button" type="button" onClick={this.props.onCanceled}>Back</button>
        <button className="pure-button pure-button-primary">
          { characterUpdates.id ? 'Update' : 'Add' }
        </button>
      </fieldset>
    </form>;

  }
}

interface ICharacterFormProps {
  characterInfo: ICharacter, 
  onInfoUpdated: (character: ICharacter) => void,
  onCanceled: () => void
}