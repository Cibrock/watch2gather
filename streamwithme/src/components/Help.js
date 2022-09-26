import React from 'react';
import "./styles/Help.css";
import { hookstate, useHookstate } from '@hookstate/core';
import ReactModal from 'react-modal';

// In diesem Popup wird die Nutzung der Seite erklärt.

export const popupHelpStatus = hookstate(false);

const Help = () => {
    const status = useHookstate(popupHelpStatus);

    const toggle = () => { status.set(!status); };

    return (
        <ReactModal
            overlayClassName="overlay"
            className="modal-help-content"
            isOpen={status.get()}
            onRequestClose={toggle}
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            shouldReturnFocusAfterClose={true}
            preventScroll={true}
            contentLabel={"Popup für Hilfe"}
        >
            <h2>Erklärung der einzelnen Funktionen</h2>
            <div className="help-element" >
                <h3>Einen Raum erstellen</h3>
                <p>
                    Wählen Sie den "Einen Raum erstellen" Button in der Mitte der Seite an. 
                    Sollten Sie noch keinen Nutzernamen haben, werden Sie nun aufgefordert einen Benutzernamen einzugeben. 
                    Wenn Sie diesen bestätigen, wird Ihr Raum erstellt und Sie werden direkt zu Ihrem Raum weitergeleitet.
                </p>
            </div>
            <div className="help-element" >
                <h3>Einem Raum beitreten</h3>
                <p>Sie können Räume über die Raumliste, oder einen Einlade-Link betreten</p>
                <h4>Die Raum-Liste</h4>
                <p>
                    Die Raumliste finden Sie auf der Hauptseite im unteren Drittel. Hier werden alle derzeit geöffneten Räume gelistet. 
                    Sie können direkt einsehen, wie viele Leute in diesem sind. Wählen Sie einen Raum an, um ihm beizutreten. 
                    Sollten Sie noch keinen Nutzernamen haben, werden Sie nun aufgefordert einen Benutzernamen einzugeben.
                </p>
                <h4>Der Einladelink</h4>
                <p>
                    Einladelinks sind Links, die in den einzelnen Räumen erstellt und weitergegeben werden können. 
                    Beim Ausführen des Links werden Sie direkt zum Beitritt des dazugehörigen Raums geleitet.
                </p>
            </div>
            <div className="help-element" >
                <h3>Der Benutzername</h3>
                <p>
                    Der Benutzername identifiziert Sie in den einzelnen Räumen, daher ist er Voraussetzung um einen Raum zu erstellen oder beizutreten. 
                    Wenn sie einem Raum beigetreten sind, wird Ihr Nutzername in der User-Liste aufgeführt. 
                    Ihre Nachrichten im Chat werden ebenfalls ihrem Benutzernamen zugeordnet.
                    Wenn sie die Seite verlassen, wird ihr Nutzername gelöscht.
                </p>
            </div>
            <div className="help-element" >
                <h3>Einen Einlade-Link erstellen</h3>
                <p>
                    Mit dem Einladelink können Ihre Freunde direkt Ihrem Raum beitreten. 
                    Sie können einen Einladelink durch Anwählen des Raum-Titels, in der Mitte des oberen Bereichs ihres Raums, erstellen.
                    Der Link wird dann direkt in Ihre Zwischenablage kopiert und Sie können ihn bequem in jegliche Nachrichten kopieren.
                </p>
            </div>
            <div className="help-element" >
                <h3>Ein Video Posten</h3>
                <p>
                    Ein Video können Sie ganz bequem mit dem Raum teilen. 
                    Geben Sie den Link zu dem gewünschten Video einfach in das mit "Video URL eingeben" gekennzeichnete Eingabefeld ein.
                </p>
            </div>
            <div className="help-element" >
                <h3>Funktionen des Players</h3>
                <p>
                    Alle Videos übernehmen nicht nur die Funktionen der Plattform des Videos (YouTube, Vimeo, etc.), sondern der Fortschritt wird mit allen Nutzern des Raums geteilt.
                    Sie können das Video pausieren, spulen oder wechseln. Jegliche Aktionen werden in Ihrem Raum und somit allen Nutzern des Raums synchronisiert.
                </p>
            </div>
            <div className="help-element" >
                <h3>Die User-Liste</h3>
                <p>
                    Die User-Liste ist eine Aufzählung aller Nutzer, die derzeit diesem Raum beigetreten sind.
                </p>
            </div>
            <div className="help-element" >
                <h3>Der Chat</h3>
                <p>
                    Sie können den integrierten Chat nutzen, um mit allen beigetretenen Nutzern des Raums zu kommunizieren. 
                    Mit dem Raum geteilte Nachrichten werden in der Chat-Box angezeigt.
                    Um selbst eine Nachricht mit dem Raum zu teilen, geben Sie einfach ihre gewünschte Nachricht in das mit "Nachricht eingeben" Eingabefeld ein.
                    Falls der Author einer Nachricht nicht mehr angemeldet ist, wird dieser als "[gelöscht]" angezeigt.
                    Nach dem Schließen eines Raumes wird der gesamte Chat-Verlauf gelöscht.
                </p>
            </div>
            <button className="modal-btn" onClick={toggle}>×</button>
        </ReactModal>
    );
};
export default Help;