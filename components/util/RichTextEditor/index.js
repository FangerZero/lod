import styles from '../../../styles/components/util/RichTextEditor/Index.module.css';
import React, { useState, useRef, useEffect } from "react";

// Can make a 2nd ref and set innerHtml with savedHtml
export default function RichTextEditor(props) {
    const fontList = ['Arial', 'Courier New', 'cursive', 'Garamond', 'Georgia', 'Times New Roman', 'Verdana'];
    let htmlToSaveRef = useRef(null);
//    const [htmlToSave, setHtmlToSave] = useState(props.htmlToSave);
    const [rteSettings, setRTESettings] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        superscript: false,
        subscript: false,
        fontName: fontList[0],
        fontSize: 3,
        fontColor: '#000000',
        fontHighlight: '#ffffff'
    });

    useEffect(() => {
        htmlToSaveRef.current.innerHTML = props.htmlToSave;
    });

    const modifyText = (command, defaultUi, value) => {

    };

    const saveHtml = () => {
        console.log('rteSettings: ', rteSettings);
        props.setHtmlToSave(htmlToSaveRef.current.innerHTML);
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <div className={styles.section}>
                    <button id="bold" onClick={() => setRTESettings({...rteSettings, bold: !rteSettings.bold})} className="option-button format">B</button>
                    <button id="italic" onClick={() => setRTESettings({...rteSettings, italic: !rteSettings.italic})} className="option-button format">I</button>
                    <button id="underline" onClick={() => setRTESettings({...rteSettings, underline: !rteSettings.underline})} className="option-button format">U</button>
                    <button id="strikethrough" onClick={() => setRTESettings({...rteSettings, strikethrough: !rteSettings.strikethrough})} className="option-button format">S</button>
                    <button id="superscript" onClick={() => setRTESettings({...rteSettings, superscript: !rteSettings.superscript})} className="option-button format">Sup</button>
                    <button id="subscript" onClick={() => setRTESettings({...rteSettings, subscript: !rteSettings.subscript})} className="option-button format">Sub</button>
                </div>
                <div className="section">
                    <button id="insertOrderedList" className="option-button format">OL</button>
                    <button id="insertUnorderedList" className="option-button format">UL</button>
                </div>
                <div className="section">
                    <button id="undo" className="option-button format">Undo</button>
                    <button id="redo" className="option-button format">Redo</button>
                </div>
                <div className="section">
                    <button id="createLink" className="option-button format">Link</button>
                    <button id="unlink" className="option-button format">Unlink</button>
                </div>
                <div className="section">
                    <button id="justifyLeft" className="option-button format">Left</button>
                    <button id="justifyCenter" className="option-button format">Center</button>
                    <button id="justifyRight" className="option-button format">Right</button>
                    <button id="justifyFull" className="option-button format">Full</button>
                    <button id="indent" className="option-button format">Indent</button>
                    <button id="outdent" className="option-button format">Outdent</button>
                </div>
                <div className="section">
                    <select id="formatBlock" className="adv-option-button">
                        <option value="H1">H1</option>
                        <option value="H2">H2</option>
                        <option value="H3">H3</option>
                        <option value="H4">H4</option>
                        <option value="H5">H5</option>
                        <option value="H6">H6</option>
                    </select>
                </div>
                <div className="section">
                    <select id="fontName" className="adv-option-button" defaultValue={rteSettings.fontName} onChange={(e) => setRTESettings({...rteSettings, fontName: e.target.value})}>
                        {fontList.map((item,key) => <option key={key} value={item}>{item}</option>)}
                    </select>
                    <select id="fontSize" className="adv-option-button" defaultValue={rteSettings.fontSize} onChange={(e) => setRTESettings({...rteSettings, fontSize: e.target.value})}>
                        {[1,2,3,4,5,6,7].map((item,key) => <option key={key} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="section">
                    <div className="input-wrapper">
                        <input type="color" id="fontColor" className="adv-option-button" value={rteSettings.fontColor} onChange={(e) => setRTESettings({...rteSettings, fontColor: e.target.value})}/>
                        <label htmlFor="fontColor">Font Color</label>
                    </div>
                    <div className="input-wrapper">
                        <input type="color" id="fontHighlight" className="adv-option-button" value={rteSettings.fontHighlight} onChange={(e) => setRTESettings({...rteSettings, fontHighlight: e.target.value})}/>
                        <label htmlFor="fontHighlight">Font Highlight</label>
                    </div>
                </div>
            </div>
            <div id="text-input" contentEditable="true" onBlur={saveHtml} ref={htmlToSaveRef} className={styles.input}></div>
        </div>
    );
}