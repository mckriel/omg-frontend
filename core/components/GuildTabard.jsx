import { useState, useEffect } from 'react';

const GuildTabard = ({ size = 64, showGuildName = true }) => {
  const [tabard_data, set_tabard_data] = useState(null);

  useEffect(() => {
    // Load guild tabard information
    fetch('/guild-tabard/guild-tabard-info.json')
      .then(response => response.json())
      .then(data => set_tabard_data(data))
      .catch(error => console.error('Failed to load guild tabard data:', error));
  }, []);

  if (!tabard_data) {
    return (
      <div 
        className="guild-tabard-placeholder" 
        style={{ 
          width: size, 
          height: size,
          backgroundColor: '#333',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666'
        }}
      >
        ?
      </div>
    );
  }

  const { emblem, border, background } = tabard_data.crest;
  const emblem_color = `rgba(${emblem.color.rgba.r}, ${emblem.color.rgba.g}, ${emblem.color.rgba.b}, ${emblem.color.rgba.a})`;
  const border_color = `rgba(${border.color.rgba.r}, ${border.color.rgba.g}, ${border.color.rgba.b}, ${border.color.rgba.a})`;
  const background_color = `rgba(${background.color.rgba.r}, ${background.color.rgba.g}, ${background.color.rgba.b}, ${background.color.rgba.a})`;

  return (
    <div className="guild-tabard-container" style={{ textAlign: 'center' }}>
      <div
        className="guild-tabard"
        style={{
          position: 'relative',
          width: size,
          height: size,
          backgroundColor: background_color,
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'inline-block',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: background_color
          }}
        />
        
        {/* Emblem */}
        <img
          src={emblem.localPath}
          alt="Guild Emblem"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '70%',
            filter: `brightness(0) saturate(100%) invert(${emblem.color.rgba.r / 255}) sepia(1) saturate(100%) hue-rotate(${Math.atan2(emblem.color.rgba.g - emblem.color.rgba.r, emblem.color.rgba.b - emblem.color.rgba.r) * 180 / Math.PI}deg)`,
            objectFit: 'contain'
          }}
        />
        
        {/* Border */}
        <img
          src={border.localPath}
          alt="Guild Border"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            filter: `brightness(0) saturate(100%) invert(${border.color.rgba.r / 255}) sepia(1) saturate(100%) hue-rotate(${Math.atan2(border.color.rgba.g - border.color.rgba.r, border.color.rgba.b - border.color.rgba.r) * 180 / Math.PI}deg)`,
            objectFit: 'contain'
          }}
        />
      </div>
      
      {showGuildName && (
        <div
          className="guild-name"
          style={{
            marginTop: '8px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center'
          }}
        >
          {tabard_data.guildName}
        </div>
      )}
    </div>
  );
};

export default GuildTabard;