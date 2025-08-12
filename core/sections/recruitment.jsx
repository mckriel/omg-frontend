'use client'

import Link from 'next/link'
import { Box, Paper, Grid, Divider, Typography, Container } from '@mui/material'
import ThemeProvider from '@/core/themes'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupsIcon from '@mui/icons-material/Groups'
import CelebrationIcon from '@mui/icons-material/Celebration'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HandshakeIcon from '@mui/icons-material/Handshake'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'

// Components

import ContentWrapper from '@/core/components/content'
import { MultiColorHeadingH1, P, H3, H4 } from '@/core/components/typography'

import './scss/recruitment.scss'

// React component
const Recruitment = () => {
    return (
        <section className="recruitment">
            <>
                <ContentWrapper>
                    <Box sx={{ pt: 5, pb: 8 }}>
                        <div>
                            <Box sx={{ mb: 2 }}>
                                <MultiColorHeadingH1
                                    floatingText="War Within Season 3"
                                    highlightText="One More Game"
                                >
                                    is recruiting
                                </MultiColorHeadingH1>
                                
                                <Typography variant="body1" sx={{ mt: 3,}}>
                                    One More Game is semi-hardcore guild located on the
                                    retail EU-Sylvanas Realm.
                                    <br /> We&apos;re looking for players who can
                                    strengthen our roster and help us progress Mythic as
                                    far as possible.
                                    <br /> <br /> The guild is welcoming and open to
                                    everyone. <br /> Our players are from across the
                                    globe, but unite under our banner to enjoy all
                                    aspects of the game.
                                    <br />
                                    <br />
                                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                                        All social applicants and classes are welcome,
                                        for Mythic Raiding we have the following
                                        criteria and requirements <br /> - Exceptions
                                        are possible for exceptional applicants.
                                    </Typography>
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <H3>What we&apos;re looking for:</H3>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'primary.main',
                                                mt: 2
                                            }}
                                            elevation={3}
                                        >
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>
                                                    1) For <strong>Season 3</strong> progression
                                                    we&apos;re looking for <strong>685+</strong> itemlevel
                                                </li>
                                                <li>
                                                    2) <strong>4/8</strong> Mythic Experience or
                                                    greater
                                                </li>
                                                <li>
                                                    3) Good logs showing both{' '}
                                                    <strong>Output and Mechanical</strong>{' '}
                                                    performance
                                                </li>
                                                <li>
                                                    4) <strong>Being prepared</strong> in
                                                    analyzing your own logs, class and spec, as
                                                    well as reading into raid mechanics
                                                </li>
                                                <li>
                                                    5){' '}
                                                    <strong>Good Communication Skills</strong>{' '}
                                                    and <strong>Teamwork</strong>
                                                </li>
                                                <li>
                                                    6) Can take{' '}
                                                    <strong>Constructive Critism</strong> inline
                                                    with the goals we&apos;ve set as a guild
                                                </li>
                                                <li>
                                                    7) Regular <strong>Raid Attendance</strong>{' '}
                                                    on <strong>Tuesdays and Thursdays</strong>,
                                                    from <strong>7:45pm to 11:00pm</strong>{' '}
                                                    server time.
                                                </li>
                                            </Box>
                                        </Paper>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <H3>Required Raid Addons:</H3>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'info.main',
                                                mt: 2
                                            }}
                                            elevation={3}
                                        >
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>
                                                    1) <strong>Method Raid Tools</strong> - <a href="https://www.curseforge.com/wow/addons/method-raid-tools" target="_blank" rel="noopener noreferrer" className="addon-link">Download Here</a>
                                                </li>
                                                <li>
                                                    2) <strong>RClootcouncil</strong> (Loot system addon) - <a href="https://www.curseforge.com/wow/addons/rclootcouncil" target="_blank" rel="noopener noreferrer" className="addon-link">Download Here</a>
                                                </li>
                                                <li>
                                                    3) Either <strong>DBM</strong> (<a href="https://www.curseforge.com/wow/addons/deadly-boss-mods" target="_blank" rel="noopener noreferrer" className="addon-link">Download</a>) 
                                                    or <strong>Bigwigs</strong> (<a href="https://www.curseforge.com/wow/addons/big-wigs" target="_blank" rel="noopener noreferrer" className="addon-link">Download</a>)
                                                </li>
                                                <li>
                                                    4) <strong>Weakauras2</strong> - <a href="https://www.curseforge.com/wow/addons/weakauras-2" target="_blank" rel="noopener noreferrer" className="addon-link">Download Here</a> 
                                                    (Appropriate raiding Weak auras will be linked in Discord)
                                                </li>
                                            </Box>
                                        </Paper>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            <Box sx={{ mb: 2 }}>
                                <H3>More about us</H3>
                                
                                <Grid container spacing={3}>
                                    {/* Progression Raids */}
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                height: '100%',
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'error.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <MilitaryTechIcon sx={{ mr: 2, mt: 1, color: 'primary.main', fontSize: 24 }} />
                                                <H4>Raid Atmosphere - Progression Raids</H4>
                                            </Box>
                                            
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>Clear comms during pulls - letting our RL and Officers guide us effectively</li>
                                                <li>Feel free to socialize between pulls while staying raid-ready</li>
                                            </Box>
                                            
                                            <Accordion defaultExpanded sx={{ mt: 2, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Our Inclusive Approach
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>We value every raider and strive to include everyone in our progression journey</li>
                                                        <li>Our officers are dedicated to helping you improve and reach both personal and guild goals</li>
                                                        <li>We believe in creating a balanced environment where everyone can enjoy raiding together</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Raid Composition Guidelines
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>Adjustments to raid composition are always a last resort and considered only when:
                                                            <Box component="ul" sx={{ pl: 2 }}>
                                                                <li>Technical issues are significantly impacting your experience</li>
                                                                <li>We need to balance the team for specific encounter challenges</li>
                                                            </Box>
                                                        </li>
                                                        <li>When WoW's tuning presents challenges, we'll explore creative solutions to keep everyone involved</li>
                                                        <li>Any adjustments are made with transparency and fairness in mind</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Support System
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>Our officers are here to support your growth, not just evaluate performance</li>
                                                        <li>We'll provide constructive feedback and resources to help you improve</li>
                                                        <li>If you're facing challenges, we'll work together to find solutions</li>
                                                        <li>If you're unable to meet the requirements for progression raiding, we may ask you to join social raids as a means to improve before returning to the progression team</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Paper>
                                    </Grid>
                                    
                                    {/* Raid Structure & Growth */}
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                height: '100%',
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'success.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <GroupsIcon sx={{ mr: 2, mt: 1, color: 'primary.main', fontSize: 24 }} />
                                                <H4>Raid Structure & Growth</H4>
                                            </Box>
                                            
                                            <Accordion defaultExpanded sx={{ bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Raid Structure
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>We aim for a core team of 25 raiders with a flexible roster of 29 total members</li>
                                                        <li>If encounter design requires fewer players, we'll communicate changes well in advance</li>
                                                        <li>Our goal is to find the right balance that allows everyone to participate while ensuring progression</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Growth Opportunities
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>We'll provide personalized feedback to help you develop:
                                                            <Box component="ul" sx={{ pl: 2 }}>
                                                                <li>Mechanical skills and encounter awareness</li>
                                                                <li>Class performance optimization</li>
                                                                <li>Team coordination and communication</li>
                                                            </Box>
                                                        </li>
                                                        <li>Our focus is on helping you succeed, not just meeting benchmarks</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Paper>
                                    </Grid>
                                    
                                    {/* Social Raids */}
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                height: '100%',
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'warning.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <CelebrationIcon sx={{ mr: 2, mt: 1, color: 'primary.main', fontSize: 24 }} />
                                                <H4>Raid Atmosphere - Social Raids</H4>
                                            </Box>
                                            
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>A relaxed and fun environment to enjoy the game together</li>
                                                <li>Great opportunity for regular raiders to practice or try new specs</li>
                                                <li>Using RCLootCouncil with standard rules</li>
                                                <li>While regular raiders don't have gear priority, we appreciate the community spirit of gear sharing when possible</li>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    
                                    {/* Progression Approach */}
                                    <Grid item xs={12} md={6}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                height: '100%',
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'info.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <TrendingUpIcon sx={{ mr: 2, mt: 1, color: 'primary.main', fontSize: 24 }} />
                                                <H4>Progression Approach</H4>
                                            </Box>
                                            
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>Brief pre-boss refreshers to get everyone on the same page:
                                                    <Box component="ul" sx={{ pl: 2 }}>
                                                        <li>Detailed strategies available on Discord for your convenience</li>
                                                        <li>We encourage reviewing PTR/guides beforehand</li>
                                                        <li>Questions are always welcome in Discord before raid time</li>
                                                        <li>Coming prepared helps us all progress together smoothly</li>
                                                    </Box>
                                                </li>
                                                <li>We value preparation as it helps us make the most of our raid time together</li>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    
                                    {/* Working Together */}
                                    <Grid item xs={12}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'primary.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <HandshakeIcon sx={{ mr: 2, mt: 1, color: 'primary.main', fontSize: 24 }} />
                                                <H4>Working Together</H4>
                                            </Box>
                                            
                                            <Box component="ul" sx={{ pl: 2 }}>
                                                <li>We maintain focused but positive communication during pulls - we're serious about progression but never forget to have fun along the way!</li>
                                                <li>Detailed feedback is saved for break time to keep the flow going, giving everyone a chance to learn and improve in a constructive environment</li>
                                                <li>Feel free to bring up important issues to the RL when needed - your insights are valuable and might help the whole team succeed</li>
                                                <li>We celebrate each other's achievements and support each other through challenges - wipes are just learning opportunities!</li>
                                                <li>Our community thrives on mutual respect and encouragement - we're committed to creating a space where everyone feels valued</li>
                                                <li>We understand that everyone has different learning styles and paces - patience and support are cornerstones of our raiding philosophy</li>
                                                <li>We&apos;re all in this together - your success is our success, and every progression milestone is a shared victory!</li>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    
                                    {/* Loot and Rewards */}
                                    <Grid item xs={12}>
                                        <Paper 
                                            sx={{ 
                                                p: 3, 
                                                bgcolor: 'background.default',
                                                borderLeft: '4px solid',
                                                borderColor: 'secondary.main'
                                            }}
                                            elevation={3}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <CelebrationIcon sx={{ mr: 2, mt: 1, color: 'secondary.main', fontSize: 24 }} />
                                                <H4>Loot and Rewards</H4>
                                            </Box>
                                        
                                            
                                            <Accordion defaultExpanded sx={{ bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        How does our loot system work?
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>We use RCLootCouncil to manage loot distribution in a transparent way</li>
                                                        <li>Items are assigned based on in-addon rolls (BIS &gt; Need &gt; Greed &gt; Transmog)</li>
                                                        <li>All loot history is exported and available for review</li>
                                                        <li>The system is designed to be fair while supporting our raid progression goals</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        Is loot distribution random or decided by officers?
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>For most items, distribution is based on your roll within the appropriate category</li>
                                                        <li>Officers verify BIS claims to ensure fairness, which is why RCLootCouncil is required</li>
                                                        <li>You can absolutely win multiple items in one night if the rolls are in your favor!</li>
                                                        <li>The council&apos;s role is to manage the process, not to funnel gear to specific players</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        How are tier items handled?
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>Tier items follow a strategic distribution to maximize raid benefits:</li>
                                                        <Box component="ul" sx={{ pl: 2 }}>
                                                            <li>Priority goes to players who will complete their 2-set before those working on 4-set</li>
                                                            <li>This helps us unlock important power spikes across the raid team faster</li>
                                                            <li>Within each priority group, distribution is still based on rolls</li>
                                                        </Box>
                                                        <li>This approach balances individual upgrades with overall raid progression</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            
                                            <Accordion sx={{ mt: 1, bgcolor: 'background.paper', '&:before': { display: 'none' } }}>
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        What about gear outside of raids?
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                                                        <li>We encourage forming guild M+ groups to help each other gear up</li>
                                                        <li>Consider sharing tradeable items with guildies who might benefit more (especially those with limited playtime)</li>
                                                        <li>This is a friendly request, not a requirement - we respect that your time investment deserves rewards</li>
                                                        <li>The stronger we all become individually, the further we progress as a team!</li>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                                <Link 
                                    href="https://discord.gg/UnQmaASMYV" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{
                                        background: 'linear-gradient(45deg, #FF8E3C 0%, #FF5722 100%)',
                                        boxShadow: '0 4px 20px rgba(255, 87, 34, 0.4)',
                                        padding: '12px 30px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '4px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        borderLeft: '4px solid #8dd52b'
                                    }}
                                    className="discord-apply-button"
                                >
                                    Apply via Discord
                                </Link>
                            </Box>
                        </div>
                    </Box>
                </ContentWrapper>
            </>
        </section>
    )
}

export default Recruitment
