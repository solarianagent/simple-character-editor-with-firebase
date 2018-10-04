import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import { CharacterForm } from './CharacterForm';
import { characterService, ICharacter } from './CharacterService';

class CharacterEdit extends React.Component<RouteComponentProps<{id?: string}>, {characterInfo: ICharacter, toCharacters: boolean}> {
  constructor(props: RouteComponentProps<{id?: string}>) {
    super(props);
    this.state = {characterInfo: {}, toCharacters: false};
  }

  public componentDidMount() {
    const {id} = this.props.match.params;

    if(id) {
      characterService.getCharacter(id) 
        .then(characterInfo => 
          this.setState(({toCharacters}) => ({characterInfo, toCharacters}))
        );
    }
  }

  public saveCharacter = (characterUpdates: ICharacter)  => {
    const saveCharacterOnServer: Promise<void|string> = this.state.characterInfo.id
      ? characterService.updateCharacter(characterUpdates)
      : characterService.addCharacter(characterUpdates);

    saveCharacterOnServer
      .then(() => 
        this.setState(({characterInfo}) => ({characterInfo, toCharacters: true}))
      );
  }

  public goBack = () => {
    this.setState(({characterInfo}) => ({characterInfo, toCharacters: true}));
  }

  public render() {
    const {characterInfo, toCharacters} = this.state;

    if(toCharacters) {
      return <Redirect to="/characters"/>;
    }

    return <CharacterForm characterInfo={characterInfo} onInfoUpdated={this.saveCharacter} onCanceled={this.goBack} />
  }
}

export default CharacterEdit;