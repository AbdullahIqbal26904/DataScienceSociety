import {createSlice} from '@reduxjs/toolkit';

// Static data for IBA Data Science Society
const societyData = {
    name: "IBA Data Science Society",
    tagline: "Where Data Meets Innovation",
    mission: "To cultivate a thriving ecosystem of data enthusiasts at IBA by providing hands-on learning experiences, industry exposure, and collaborative opportunities. We bridge the gap between academic theory and real-world data science applications, empowering students to solve tomorrow's challenges today.",
    vision: "To become Pakistan’s leading student data science community, helping students learn, grow, and make a real impact in the real world.",
    about: [
        "Founded by passionate students at the Institute of Business Administration, the Data Science Society (DSS) has grown into one of IBA's most dynamic technical communities.",
        "From beginner-friendly Python workshops to advanced machine learning bootcamps, industry speaker sessions to 48-hour hackathons, we create spaces where curiosity transforms into expertise. Our flagship events like HackFest x Datathon have attracted 500+ participants.",
        "Whether you're a business student curious about analytics or a CS major diving deep into neural networks, DSS welcomes everyone. No prior experience needed — just bring your enthusiasm to learn and collaborate!"
    ],
    events: [
        {
            title: "DSS Launch Event",
            date: "Successfully Conducted",
            description: "Our grand launch event featured exciting interactive games, networking sessions, and a thrilling ML Competition where participants showcased their machine learning skills. A memorable kickoff for the Data Science Society!",
            video: "/assets/launch-event-reel.mp4",
            status: "completed"
        },
        {
            title: "Hackfest x Datathon 2.0",
            date: "Upcoming - 2026",
            description: "Get ready for the ultimate data challenge! In collaboration with IBA Google Developers Group, we're bringing Hackfest x Datathon 2.0 - a fusion of hackathon innovation and data science competition. Build, analyze, and compete!",
            collaboration: {
                images: [
                    "/assets/IBA Data Science Society (Secondary).png",
                    "/assets/GDG On Campus - Horizontal - Dark.png"
                ]
            },
            status: "upcoming"
        }
    ],
    dataverse: {
        title: "DataVerse 2025",
        tagline: "The flagship data science competition",
        description: "DataVerse brings together the brightest minds to solve real-world problems using data. Teams compete to develop innovative solutions for industry challenges.",
        date: "Coming March 2026",
        registration: "Registration opening soon",
        image: "/assets/image4.png"
    },
    gallery: [
        { image: "/assets/hxd-25/DSC_6286.jpg", caption: "HXD'25 Opening Ceremony", category: "ceremony" },
        { image: "/assets/hxd-25/DSC_6315.jpg", caption: "Participants Arriving at Venue", category: "participants" },
        { image: "/assets/hxd-25/DSC_6348.jpg", caption: "Team Collaboration Session", category: "teamwork" },
        { image: "/assets/hxd-25/DSC_6351.jpg", caption: "Coding in Action", category: "coding" },
        { image: "/assets/hxd-25/DSC_6357.jpg", caption: "Mentorship Moment", category: "mentorship" },
        { image: "/assets/hxd-25/DSC_6530.jpg", caption: "Late Night Hacking", category: "coding" },
        { image: "/assets/hxd-25/DSC_6618.jpg", caption: "Project Presentations", category: "presentations" },
        { image: "/assets/hxd-25/DSC_6639.jpg", caption: "Judges Evaluation", category: "judging" },
        { image: "/assets/hxd-25/DSC_6659.jpg", caption: "Networking Break", category: "networking" },
        { image: "/assets/hxd-25/DSC_6826.jpg", caption: "Workshop Session", category: "workshop" },
        { image: "/assets/hxd-25/DSC_7068.jpg", caption: "Team Spirit", category: "teamwork" },
        { image: "/assets/hxd-25/DSC_7211.jpg", caption: "Finalist Showcase", category: "presentations" },
        { image: "/assets/hxd-25/DSC_7372.jpg", caption: "Award Ceremony", category: "ceremony" },
        { image: "/assets/hxd-25/DSC_7613.jpg", caption: "Winners Celebration", category: "ceremony" }
    ],
    socialLinks: {
        instagram: "https://instagram.com/ibadatasciencesociety",
        linkedin: "https://linkedin.com/company/iba-data-science-society",
        github: "https://github.com/iba-data-science-society",
        email: "dss@khi.iba.edu.pk"
    }
}

const initialState = {
    society: societyData,
    showloader: true
}

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setshowloader: (state, action) => {
            state.showloader = action.payload;
        },
        setInitialData: (state) => {
            state.society = societyData;
        }
    }
})

export const {setshowloader, setInitialData} = portfolioSlice.actions
export default portfolioSlice.reducer