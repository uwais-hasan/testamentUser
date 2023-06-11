// import React,{useRef} from 'react';
//
// const Contact = () => {
//     const boxRef1 = useRef(null);
//     const boxRef2 = useRef(null);
//     const boxRef3 = useRef(null);
//
//     const handleBoxClick = (boxRef) => {
//         boxRef.current.scrollIntoView({ behavior: 'smooth' });
//     };
//
//     return (
//         <div>
//             <div>
//                 <div  className="box" onClick={() => handleBoxClick(boxRef1)}>
//                     <h2>Box 1</h2>
//                 </div>
//                 <div className="box" onClick={() => handleBoxClick(boxRef2)}>
//                     <h2>Box 2</h2>
//                 </div>
//                 <div className="box" onClick={() => handleBoxClick(boxRef3)}>
//                     <h2>Box 3</h2>
//                 </div>
//             </div>
//             <div>
//                 <div style={{background:'red',height:'600px'}} ref={boxRef1}>
//                     <h2>Content of Box 1</h2>
//                     <p>This is the content of Box 1</p>
//                 </div>
//                 <div style={{background:'green',height:'600px'}} ref={boxRef2}>
//                     <h2>Content of Box 2</h2>
//                     <p>This is the content of Box 2</p>
//                 </div>
//                 <div style={{background:'blue',height:'600px'}} ref={boxRef3}>
//                     <h2>Content of Box 3</h2>
//                     <p>This is the content of Box 3</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Contact;


import React from 'react';
import {Box, Grid} from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import KeyIcon from '@mui/icons-material/Key';
import ContactMailIcon from '@mui/icons-material/ContactMail';
const Contact = () => {
    return (
        <div>
            <Box className='overView_website'>
                <h1>An overview of the website</h1>
                <p>
                    The Will website enables you to securely and confidentially write your will through a set of options
                    that you define, allowing others to view your will before or after your passing
                </p>
            </Box>
            <Box className='whyUseWebSite'>
                <h1>Why should you use the website?</h1>
                <p>

                    In the current times we live in, sudden death has become a haunting fear for everyone, regardless of age. Unfortunately, many people neglect this matter, especially the youth, as they hesitate to write their wills. The reasons may simply be that they don't want anyone to see their will until after their death, or there may be other reasons such as continuous procrastination.
                    Therefore, there was a need to find a solution to this problem, where everyone can write their will with great security and complete confidentiality, without anyone being able to access it. This is achieved through a set of options determined by the user, allowing them to make their will available to everyone or keep it private, and only accessible through a specific set of steps defined by the user writing the will.
                    We will explain this in detail in the user guide of the website, where we will provide a step-by-step explanation of how to use these options and adjust the settings in an easy and intuitive manner. This will enable users to maintain the privacy of their wills and accurately fulfill their desires in a trustworthy manner.

                </p>
            </Box>
            <Box className="feature">
                <h2>future</h2>
                <p>
                    1-The website provides an easy-to-use and convenient platform for writing your will. You can access it from anywhere with an internet connection, eliminating the need for paper documents.
                    2- The website ensures high levels of security and privacy, protecting your personal and sensitive information. Your will is securely stored and can only be accessed by authorized individuals.
                    3- The website offers you multiple options to maintain the confidentiality of your will through user voting (which requires logging in by the voters) or voting by designated individuals (important note: designated individuals do not need to log in or register). You can also choose to make your will available to everyone.
                    4- This application is free and will remain free forever.
                    5- There are many features that you will discover for yourself.
                </p>
            </Box>
            <Box className="how_to-use">
                <h2>how to use ?</h2>
                <p>
                    1-Creating the will
                    2- Writing the will
                    3- Choosing the mode
                </p>
            </Box>
            <Box className='boxes_how_to-use'>
                <Grid container>
                    <Grid item>
                        <PublicIcon/>
                        <p>Public</p>
                    </Grid>
                    <Grid item>
                        <GroupIcon/>
                        <p>Users voting</p>
                    </Grid>
                    <Grid item>
                        <KeyIcon/>
                        <p>Special Friends</p>
                    </Grid>
                </Grid>
            </Box>
            <Box className='Choosing the mode'>
                <Box className='mode-public'>
                    <h2>public</h2>
                    <p>If you choose this mode, your will becoms publicly available, where anyone who enters the link to your will can view it by clicking the "Show Will" button. You can modify the privacy of your will and make it available to everyone by choosing the "User Voting" mode or by selecting "special users" mode for access.</p>
                </Box>
                <Box className='mode-Users_voting'>
                    <h2>Users voting</h2>
                    <p>By choosing this mode, you will find an option where you can select the number of users. The chosen number of users will be considered as a vote by the users. If the specified number of users vote, your will be made available to everyone. For example, if you choose 100 people, and 100 users vote, your will be accessible to everyone. However, if only 99 users vote, your will won't be accessible to anyone. It's important to note that this type of voting requires logging in.</p>
                </Box>
                <Box className='mode-Special_Friends'>
                    <h2>Special Friends</h2>
                    <p>
                        When you choose this mode, you will notice the presence of two options.

                        The first option: "Select Trusted Friends." You will fill in the fields with the email address, name, and password (for the user) who will vote on your behalf. You can write any name or email address and password that you desire and give it to your trusted friend. You can also choose a large number of friends that you want to add for voting. You can choose 5 or fewer trusted friends, or perhaps 10 or more. It is important to note that it is not necessary to register the email address or name on the website. Additionally, the friends chosen for voting are not required to log in; they can vote directly by clicking the vote button.

                        The second option: Receive the will. In this option, only the individuals you have chosen from your trusted friends will be able to view your will, while other friends will not be able to see it. When selecting the will receipt, you can add the friends who will be able to view the will from among the trusted friends you have chosen. For example, if you choose Mohamed Ali, Osama Saad, and Ahmed Mubarak as trusted friends, only these individuals can be added in the will receipt option, and you cannot add any other person apart from them.</p>
                </Box>
            </Box>
            <Box>

            </Box>



        </div>
    );
};

export default Contact;