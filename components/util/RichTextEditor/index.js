import styles from '../../../styles/components/util/RichTextEditor/Index.module.css';
import React, { useState, useRef, useEffect } from "react";

// Need to pass in from the parent function a useState Set
// htmlToSave= This is the Text the user writes, with it's formatting
// setHtmlToSave= This saves the Text the user writes in the parent to be saved in DB

export default function RichTextEditor(props) {
    const fontList = ['Arial', 'Courier New', 'cursive', 'Garamond', 'Georgia', 'Times New Roman', 'Verdana'];
    let htmlToSaveRef = useRef(props.htmlToSave);
    const [rteSettings, setRTESettings] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        superscript: false,
        subscript: false,
        fontName: fontList[0],
        fontSize: 3,
        foreColor: '#000000',
        backColor: '#ffffff'
    });
    
    useEffect(() => {
        htmlToSaveRef.current.innerHTML = props.htmlToSave;
        /*
        const setRefToProps = async () => {
            console.log('htmlToSave', props.htmlToSave);
            htmlToSaveRef.current.innerHTML = props.htmlToSave;
        }
        setRefToProps();
        */
    }, [props.htmlToSave]);

    const handleClick = (e) => {
        if (typeof rteSettings[e.target.id] == "boolean") {
            setRTESettings({...rteSettings, [e.target.id]: !rteSettings[e.target.id]});
            modifyText(e.target.id, false, null);
        } else {
            setRTESettings({...rteSettings, [e.target.id]: e.target.value});
            modifyText(e.target.id, false, e.target.value);
        }
    };

    const addLink = (e) => {
        let link = prompt("Enter URL please");
        if (!(/http/i.test(link))) {
            link = "http://" + link;
        }
        modifyText(e.target.id, false, link);
    };

    const modifyText = (command, defaultUi, value) => {
        document.execCommand(command, defaultUi, value);
    };

    const saveHtml = () => {
        props.setHtmlToSave(htmlToSaveRef.current.innerHTML);
    };
    
    return (
        <div className={styles.container} onBlur={saveHtml}>
            <div className={styles.options}>
                <div className={styles.section}>
                    <button id="bold" onClick={e => handleClick(e)} className="option-button format">B</button>
                    <button id="italic" onClick={e => handleClick(e)} className="option-button format">I</button>
                    <button id="underline" onClick={e => handleClick(e)} className="option-button format">U</button>
                    <button id="strikethrough" onClick={e => handleClick(e)} className="option-button format">S</button>
                    <button id="superscript" onClick={e => handleClick(e)} className="option-button format">Sup</button>
                    <button id="subscript" onClick={e => handleClick(e)} className="option-button format">Sub</button>
                </div>
                <div className="section">
                    <button id="insertOrderedList"  onClick={e => handleClick(e)}  className="option-button format">OL</button>
                    <button id="insertUnorderedList"  onClick={e => handleClick(e)}  className="option-button format">UL</button>
                </div>
                <div className="section">
                    <button id="undo"  onClick={e => handleClick(e)}  className="option-button format">Undo</button>
                    <button id="redo"  onClick={e => handleClick(e)}  className="option-button format">Redo</button>
                </div>
                <div className="section">
                    <button id="createLink"  onClick={e => addLink(e)}  className="option-button format" >Link</button>
                    <button id="unlink"  onClick={e => handleClick(e)}  className="option-button format">Unlink</button>
                </div>
                <div className="section">
                    <button id="justifyLeft"  onClick={e => handleClick(e)}  className="option-button format">Left</button>
                    <button id="justifyCenter"  onClick={e => handleClick(e)}  className="option-button format">Center</button>
                    <button id="justifyRight"  onClick={e => handleClick(e)}  className="option-button format">Right</button>
                    <button id="justifyFull"  onClick={e => handleClick(e)}  className="option-button format">Full</button>
                    <button id="indent"  onClick={e => handleClick(e)}  className="option-button format">Indent</button>
                    <button id="outdent"  onClick={e => handleClick(e)}  className="option-button format">Outdent</button>
                </div>
                <div className="section">
                    <select id="formatBlock" onChange={e => handleClick(e)}  className="adv-option-button">
                        <option value="H1">H1</option>
                        <option value="H2">H2</option>
                        <option value="H3">H3</option>
                        <option value="H4">H4</option>
                        <option value="H5">H5</option>
                        <option value="H6">H6</option>
                    </select>
                </div>
                <div className="section">
                    <select id="fontName" className="adv-option-button" defaultValue={rteSettings.fontName} onChange={e => handleClick(e)}>
                        {fontList.map((item,key) => <option key={key} value={item}>{item}</option>)}
                    </select>
                    <select id="fontSize" className="adv-option-button" defaultValue={rteSettings.fontSize} onChange={e => handleClick(e)}>
                        {[1,2,3,4,5,6,7].map((item,key) => <option key={key} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className="section">
                    <div className="input-wrapper">
                        <input type="color" id="foreColor" className="adv-option-button" value={rteSettings.foreColor} onChange={e => handleClick(e)}/>
                        <label htmlFor="foreColor">Font Color</label>
                    </div>
                    <div className="input-wrapper">
                        <input type="color" id="backColor" className="adv-option-button" value={rteSettings.backColor} onChange={e => handleClick(e)}/>
                        <label htmlFor="backColor">Font Highlight</label>
                    </div>
                </div>
            </div>
            <div id="text-input" contentEditable={true} ref={htmlToSaveRef} className={styles.input} />
        </div>
    );
}