import * as React from 'react';
import './CharacterItem.css';

export const CharacterItem: React.StatelessComponent<ICharacterItemProps> = (props) => {
  return <a className="pure-menu-link" onClick={props.onClick}>
    <div className="character-image">{props.characterSymbol}</div>
    <div className="character-name">{props.characterName}</div>
  </a>;
}

interface ICharacterItemProps {
  characterName?: string,
  characterSymbol: string,
  onClick: (event: React.MouseEvent) => void
}