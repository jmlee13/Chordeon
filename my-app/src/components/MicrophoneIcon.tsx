export default function MicrophoneIcon() {

    return (
        <svg width="60" height="70" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="micTitle micDesc">
        <title id="micTitle">Microphone Icon</title>
        <desc id="micDesc">A simple outline microphone with stand and base</desc>

        <rect x="160" y="80" width="160" height="240" rx="80" stroke="currentColor" strokeWidth="20" strokeLinejoin="round"></rect>

        <path d="M120 240
                v 10
                a 120 120 0 0 0 240 0
                v -10" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"></path>

        <line x1="240" y1="370" x2="240" y2="420" stroke="currentColor" strokeWidth="20" ></line>

        <line x1="160" y1="420" x2="320" y2="420" stroke="currentColor" strokeWidth="20" strokeLinecap="round"></line>
        </svg>
    )
}