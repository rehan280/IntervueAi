import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Volume2, VolumeX, TestTube, Star, Mic, Settings, Keyboard, MessageSquare } from "lucide-react";
import { directGeminiService } from "@/services/directGeminiService";
import VoiceRecorder from "./VoiceRecorder";

interface InterviewSessionProps {
  role: string;
  onComplete: (results: any) => void;
  onBack: () => void;
}

// Role-specific questions database with variations - moved outside component
        const roleQuestionsMap: Record<string, string[][]> = {
          "software-developer": [
            [
              "Tell me about a challenging technical problem you solved and the approach you took.",
              "Can you walk me through a particularly difficult technical challenge you've faced and how you tackled it?",
              "I'd like to hear about a complex technical problem you encountered. What was your approach to solving it?",
              "Could you share an example of a challenging technical issue you resolved? What was your methodology?"
            ],
            [
              "How do you stay updated with the latest programming languages and frameworks?",
              "What's your approach to keeping up with new programming languages and frameworks in this fast-evolving field?",
              "How do you ensure you're staying current with the latest developments in programming languages and frameworks?",
              "Could you tell me about your strategy for staying up-to-date with emerging programming technologies?"
            ],
            [
              "Describe a time when you had to work with a difficult team member or stakeholder.",
              "Tell me about a situation where you had to collaborate with someone who was challenging to work with.",
              "Have you ever had to work with a difficult colleague or stakeholder? How did you handle that?",
              "Could you share an experience where you had to manage a challenging working relationship?"
            ],
            [
              "What's your experience with code review processes and best practices?",
              "How do you approach code reviews? What best practices do you follow?",
              "Tell me about your experience with code review processes and how you ensure quality.",
              "What's your perspective on code review best practices and how do you implement them?"
            ],
            [
              "How do you handle debugging complex issues in production environments?",
              "What's your approach to debugging when you encounter complex issues in production?",
              "How do you go about troubleshooting complex problems in live production environments?",
              "Could you walk me through your debugging process when facing complex production issues?"
            ],
            [
              "Tell me about a project where you had to learn a new technology quickly.",
              "Have you ever had to rapidly learn a new technology for a project? How did you approach it?",
              "Can you share an experience where you needed to quickly master a new technology?",
              "What's your strategy when you need to learn a new technology under time pressure?"
            ],
            [
              "What's your approach to writing clean, maintainable code?",
              "How do you ensure your code is clean and maintainable for future developers?",
              "What principles do you follow when writing code to make it maintainable?",
              "Could you tell me about your approach to writing code that's both clean and maintainable?"
            ],
            [
              "How do you prioritize tasks when working on multiple projects?",
              "What's your method for prioritizing work when you're juggling multiple projects?",
              "How do you approach task prioritization when you have several projects on your plate?",
              "Could you share your strategy for managing priorities across multiple concurrent projects?"
            ],
            [
              "Describe a situation where you had to make a technical decision that others disagreed with.",
              "Have you ever had to make a technical decision that was met with disagreement? How did you handle it?",
              "Tell me about a time when you made a technical decision that others didn't agree with.",
              "Could you share an experience where you had to defend a technical decision against opposition?"
            ],
            [
              "What's your experience with agile development methodologies?",
              "How do you work within agile development frameworks? What's your experience been like?",
              "Tell me about your experience with agile methodologies and how you've adapted to them.",
              "What's your perspective on agile development and how have you implemented it in your work?"
            ]
          ],
          "frontend-developer": [
            [
              "How do you ensure your web applications are responsive and accessible?",
              "What's your approach to making web applications both responsive and accessible to all users?",
              "How do you go about ensuring your web applications work well across devices and for users with disabilities?",
              "Could you tell me about your strategy for creating responsive and accessible web applications?"
            ],
            [
              "Tell me about your experience with modern JavaScript frameworks like React, Vue, or Angular.",
              "What's your experience been like with modern JavaScript frameworks such as React, Vue, or Angular?",
              "How do you work with modern JavaScript frameworks? Which ones are you most comfortable with?",
              "Could you share your experience with contemporary JavaScript frameworks and how you've used them?"
            ],
            [
              "How do you optimize frontend performance and loading times?",
              "What techniques do you use to optimize frontend performance and reduce loading times?",
              "How do you approach performance optimization for frontend applications?",
              "Could you walk me through your process for improving frontend performance and speed?"
            ],
            [
              "Describe a challenging UI/UX problem you solved.",
              "Can you tell me about a particularly challenging UI/UX problem you encountered and how you resolved it?",
              "What's an example of a difficult UI/UX challenge you've faced and how did you approach it?",
              "Could you share a story about a complex UI/UX problem you solved?"
            ],
            [
              "What's your approach to state management in large applications?",
              "How do you handle state management when working on large-scale applications?",
              "What's your strategy for managing state in complex frontend applications?",
              "Could you tell me about your approach to state management in large applications?"
            ],
            [
              "How do you handle cross-browser compatibility issues?",
              "What's your process for ensuring cross-browser compatibility in your applications?",
              "How do you approach solving cross-browser compatibility challenges?",
              "Could you share your strategy for handling cross-browser compatibility issues?"
            ],
            [
              "Tell me about your experience with CSS preprocessors and modern CSS features.",
              "What's your experience been like with CSS preprocessors and modern CSS capabilities?",
              "How do you work with CSS preprocessors and modern CSS features?",
              "Could you tell me about your experience with advanced CSS tools and features?"
            ],
            [
              "How do you test your frontend code and ensure quality?",
              "What's your approach to testing frontend code and maintaining quality standards?",
              "How do you ensure the quality of your frontend code through testing?",
              "Could you walk me through your frontend testing strategy and quality assurance process?"
            ],
            [
              "What's your experience with build tools and deployment processes?",
              "How do you work with build tools and manage deployment processes for frontend applications?",
              "What's your experience with build tools and how do you handle deployment?",
              "Could you share your experience with build tools and deployment workflows?"
            ],
            [
              "How do you stay updated with frontend development trends?",
              "What's your approach to staying current with frontend development trends and best practices?",
              "How do you keep up with the latest developments in frontend technology?",
              "Could you tell me about how you stay informed about frontend development trends?"
            ]
          ],
          "backend-developer": [
            [
              "Tell me about your experience with database design and optimization.",
              "What's your experience been like with database design and performance optimization?",
              "How do you approach database design and what's your experience with optimization?",
              "Could you share your experience with designing and optimizing databases?"
            ],
            [
              "How do you handle security concerns in your backend applications?",
              "What's your approach to addressing security concerns in backend development?",
              "How do you ensure security when building backend applications?",
              "Could you tell me about your strategy for handling security in backend systems?"
            ],
            [
              "Describe a time when you had to scale an application to handle increased load.",
              "Have you ever had to scale an application to accommodate increased traffic? How did you approach it?",
              "Can you share an experience where you needed to scale an application for higher load?",
              "What's your approach to scaling applications when they need to handle more traffic?"
            ],
            [
              "What's your experience with API design and documentation?",
              "How do you approach API design and what's your experience with documentation?",
              "Tell me about your experience designing APIs and creating documentation for them.",
              "Could you share your approach to API design and documentation practices?"
            ],
            [
              "How do you handle error handling and logging in production systems?",
              "What's your strategy for error handling and logging in production environments?",
              "How do you approach error handling and logging when working with production systems?",
              "Could you tell me about your process for managing errors and logging in production?"
            ],
            [
              "Tell me about your experience with microservices architecture.",
              "What's your experience been like working with microservices architecture?",
              "How do you work with microservices and what challenges have you encountered?",
              "Could you share your experience with microservices architecture and implementation?"
            ],
            [
              "How do you ensure data consistency in distributed systems?",
              "What's your approach to maintaining data consistency across distributed systems?",
              "How do you handle data consistency challenges in distributed architectures?",
              "Could you tell me about your strategy for ensuring data consistency in distributed systems?"
            ],
            [
              "What's your approach to testing backend services?",
              "How do you approach testing when working with backend services?",
              "What's your strategy for testing backend services and ensuring quality?",
              "Could you walk me through your approach to testing backend services?"
            ],
            [
              "How do you handle database migrations and version control?",
              "What's your process for managing database migrations and version control?",
              "How do you approach database migrations and version control in your projects?",
              "Could you share your experience with database migrations and version control practices?"
            ],
            [
              "Tell me about your experience with cloud platforms and deployment.",
              "What's your experience been like with cloud platforms and deployment processes?",
              "How do you work with cloud platforms and what's your deployment experience?",
              "Could you tell me about your experience with cloud platforms and deployment strategies?"
            ]
          ],
          "data-scientist": [
            [
              "Tell me about a data analysis project where you discovered unexpected insights.",
              "Can you share an example of a data analysis project where you uncovered surprising insights?",
              "Have you ever worked on a data analysis project that revealed unexpected findings?",
              "Could you walk me through a data analysis project where you discovered insights that weren't initially obvious?"
            ],
            [
              "How do you handle missing or inconsistent data in your analysis?",
              "What's your approach to dealing with missing or inconsistent data during analysis?",
              "How do you tackle challenges with missing or inconsistent data in your work?",
              "Could you tell me about your strategy for handling data quality issues in your analysis?"
            ],
            [
              "Describe your experience with machine learning model development and deployment.",
              "What's your experience been like developing and deploying machine learning models?",
              "How do you approach machine learning model development and what's your deployment experience?",
              "Could you share your experience with the end-to-end process of ML model development and deployment?"
            ],
            [
              "How do you communicate complex statistical findings to non-technical stakeholders?",
              "What's your approach to explaining complex statistical results to business stakeholders?",
              "How do you bridge the gap between technical statistical findings and business understanding?",
              "Could you tell me about your strategy for communicating statistical insights to non-technical audiences?"
            ],
            [
              "What's your approach to feature engineering and selection?",
              "How do you approach feature engineering and what's your process for feature selection?",
              "What's your methodology for feature engineering and how do you decide which features to use?",
              "Could you walk me through your approach to feature engineering and selection?"
            ],
            [
              "Tell me about your experience with big data technologies and tools.",
              "What's your experience been like working with big data technologies and tools?",
              "How do you work with big data technologies and what tools are you most comfortable with?",
              "Could you share your experience with big data technologies and the tools you've used?"
            ],
            [
              "How do you validate and test your machine learning models?",
              "What's your approach to validating and testing machine learning models?",
              "How do you ensure the quality and reliability of your ML models through validation and testing?",
              "Could you tell me about your process for validating and testing machine learning models?"
            ],
            [
              "What's your experience with data visualization and storytelling?",
              "How do you approach data visualization and what's your experience with data storytelling?",
              "What's your experience creating visualizations and telling stories with data?",
              "Could you share your experience with data visualization and storytelling techniques?"
            ],
            [
              "How do you stay updated with the latest developments in AI and ML?",
              "What's your approach to staying current with AI and ML developments?",
              "How do you keep up with the latest trends and developments in artificial intelligence and machine learning?",
              "Could you tell me about how you stay informed about AI and ML advancements?"
            ],
            [
              "Describe a time when you had to explain a complex algorithm to a business team.",
              "Have you ever had to explain a complex algorithm to non-technical business stakeholders?",
              "Can you share an experience where you needed to break down a complex algorithm for business understanding?",
              "What's your approach to explaining complex algorithms to business teams?"
            ]
          ],
          "product-manager": [
            [
              "Tell me about a product you managed from conception to launch.",
              "Can you walk me through a product you managed from initial concept through to launch?",
              "What's an example of a product you've managed through the entire lifecycle?",
              "Could you share your experience managing a product from conception to market launch?"
            ],
            [
              "How do you prioritize features when you have limited resources?",
              "What's your approach to feature prioritization when resources are constrained?",
              "How do you make decisions about which features to prioritize when you have limited resources?",
              "Could you tell me about your strategy for prioritizing features under resource constraints?"
            ],
            [
              "Describe a time when you had to make a difficult product decision with incomplete data.",
              "Have you ever had to make a tough product decision without having all the data you needed?",
              "Can you share an experience where you had to make a product decision with limited information?",
              "What's your approach to making product decisions when you don't have complete data?"
            ],
            [
              "How do you gather and analyze user feedback to inform product decisions?",
              "What's your process for collecting and analyzing user feedback to guide product decisions?",
              "How do you approach gathering user feedback and using it to make product decisions?",
              "Could you walk me through your approach to user feedback collection and analysis?"
            ],
            [
              "Tell me about your experience working with cross-functional teams.",
              "What's your experience been like working with cross-functional teams?",
              "How do you collaborate with cross-functional teams and what challenges have you encountered?",
              "Could you share your experience working with diverse cross-functional teams?"
            ],
            [
              "How do you handle competing priorities from different stakeholders?",
              "What's your approach to managing competing priorities from various stakeholders?",
              "How do you navigate situations where different stakeholders have conflicting priorities?",
              "Could you tell me about your strategy for handling competing stakeholder priorities?"
            ],
            [
              "What's your approach to defining and measuring product success metrics?",
              "How do you approach defining success metrics for your products?",
              "What's your methodology for establishing and measuring product success metrics?",
              "Could you walk me through your approach to defining and tracking product success metrics?"
            ],
            [
              "Tell me about a time when a product launch didn't go as planned.",
              "Have you ever experienced a product launch that didn't go according to plan?",
              "Can you share an experience where a product launch faced unexpected challenges?",
              "What happened when a product launch didn't go as expected and how did you handle it?"
            ],
            [
              "How do you stay updated with market trends and competitor analysis?",
              "What's your approach to staying current with market trends and analyzing competitors?",
              "How do you keep up with market trends and what's your process for competitor analysis?",
              "Could you tell me about your strategy for monitoring market trends and competitive landscape?"
            ],
            [
              "Describe your experience with agile product development methodologies.",
              "What's your experience been like with agile product development methodologies?",
              "How do you work within agile frameworks for product development?",
              "Could you share your experience with agile methodologies in product development?"
    ]
            ],
            "ui-ux-designer": [
              [
                "Tell me about a design project where you had to balance user needs with business constraints.",
                "Can you share an example of a design project where you had to balance user requirements with business limitations?",
                "What's your experience with design projects that required balancing user needs against business constraints?",
                "Could you walk me through a design project where you had to navigate user needs and business requirements?"
              ],
              [
                "How do you conduct user research and incorporate findings into your designs?",
                "What's your approach to user research and how do you integrate those findings into your design work?",
                "How do you go about conducting user research and what's your process for incorporating insights?",
                "Could you tell me about your user research methodology and how you apply findings to designs?"
              ],
              [
                "Describe your design process from initial concept to final deliverable.",
                "Can you walk me through your design process from the initial concept stage to the final deliverable?",
                "What's your design process like, from the beginning concept to the final output?",
                "Could you share your design workflow from initial concept through to final deliverable?"
              ],
              [
                "How do you handle feedback and criticism on your designs?",
                "What's your approach to receiving and processing feedback on your design work?",
                "How do you typically handle criticism and feedback on your designs?",
                "Could you tell me about how you manage feedback and criticism on your design projects?"
              ],
              [
                "Tell me about your experience with design systems and component libraries.",
                "What's your experience been like working with design systems and component libraries?",
                "How do you work with design systems and what's your experience with component libraries?",
                "Could you share your experience with design systems and component library implementation?"
              ],
              [
                "How do you ensure your designs are accessible to users with disabilities?",
                "What's your approach to ensuring accessibility in your designs for users with disabilities?",
                "How do you go about making your designs accessible to users with different abilities?",
                "Could you tell me about your strategy for creating accessible designs?"
              ],
              [
                "What's your approach to prototyping and user testing?",
                "How do you approach prototyping and what's your process for user testing?",
                "What's your methodology for prototyping and conducting user testing?",
                "Could you walk me through your approach to prototyping and user testing?"
              ],
              [
                "Tell me about a time when you had to design for a complex user workflow.",
                "Can you share an experience where you had to design for a particularly complex user workflow?",
                "What's an example of a complex user workflow you've designed for?",
                "Could you walk me through a time when you designed for a complex user workflow?"
              ],
              [
                "How do you stay updated with design trends and best practices?",
                "What's your approach to staying current with design trends and industry best practices?",
                "How do you keep up with the latest design trends and what's your process for staying updated?",
                "Could you tell me about how you stay informed about design trends and best practices?"
              ],
              [
                "Describe your experience working with developers to implement your designs.",
                "What's your experience been like collaborating with developers to bring your designs to life?",
                "How do you work with developers and what's your experience with design implementation?",
                "Could you share your experience working with development teams to implement designs?"
              ]
            ],
            "devops-engineer": [
              [
                "Tell me about your experience with CI/CD pipeline implementation and optimization.",
                "What's your experience been like implementing and optimizing CI/CD pipelines?",
                "How do you approach CI/CD pipeline implementation and what's your optimization experience?",
                "Could you share your experience with CI/CD pipeline setup and optimization?"
              ],
              [
                "How do you handle infrastructure scaling and performance monitoring?",
                "What's your approach to infrastructure scaling and how do you handle performance monitoring?",
                "How do you go about scaling infrastructure and what's your monitoring strategy?",
                "Could you tell me about your approach to infrastructure scaling and performance monitoring?"
              ],
              [
                "Describe a time when you had to troubleshoot a critical production issue.",
                "Can you share an experience where you had to troubleshoot a critical production problem?",
                "What's an example of a critical production issue you've had to resolve?",
                "Could you walk me through a time when you had to troubleshoot a critical production issue?"
              ],
              [
                "What's your experience with containerization and orchestration tools?",
                "How do you work with containerization and what's your experience with orchestration tools?",
                "What's your experience been like with containerization and orchestration technologies?",
                "Could you share your experience with containerization and orchestration tools?"
              ],
              [
                "How do you ensure security in your infrastructure and deployment processes?",
                "What's your approach to ensuring security in infrastructure and deployment workflows?",
                "How do you go about maintaining security in your infrastructure and deployment processes?",
                "Could you tell me about your strategy for securing infrastructure and deployment processes?"
              ],
              [
                "Tell me about your experience with cloud platforms and services.",
                "What's your experience been like working with cloud platforms and various services?",
                "How do you work with cloud platforms and what services are you most familiar with?",
                "Could you share your experience with cloud platforms and the services you've used?"
              ],
              [
                "How do you handle configuration management and infrastructure as code?",
                "What's your approach to configuration management and implementing infrastructure as code?",
                "How do you go about configuration management and what's your experience with IaC?",
                "Could you tell me about your strategy for configuration management and infrastructure as code?"
              ],
              [
                "What's your approach to monitoring and alerting in production environments?",
                "How do you approach monitoring and what's your strategy for alerting in production?",
                "What's your methodology for monitoring and alerting in production environments?",
                "Could you walk me through your approach to monitoring and alerting in production?"
              ],
              [
                "Tell me about your experience with disaster recovery and backup strategies.",
                "What's your experience been like with disaster recovery planning and backup strategies?",
                "How do you approach disaster recovery and what's your experience with backup strategies?",
                "Could you share your experience with disaster recovery and backup implementation?"
              ],
              [
                "How do you stay updated with DevOps tools and best practices?",
                "What's your approach to staying current with DevOps tools and industry best practices?",
                "How do you keep up with the latest DevOps tools and what's your process for staying updated?",
                "Could you tell me about how you stay informed about DevOps tools and best practices?"
              ]
            ],
            "ai-ml-engineer": [
              [
                "Tell me about a machine learning model you developed and deployed to production.",
                "Can you share an example of a machine learning model you've developed and successfully deployed?",
                "What's an example of an ML model you've built and deployed to production?",
                "Could you walk me through a machine learning model you developed and deployed?"
              ],
              [
                "How do you handle model drift and retraining in production systems?",
                "What's your approach to managing model drift and implementing retraining in production?",
                "How do you go about handling model drift and what's your retraining strategy?",
                "Could you tell me about your approach to model drift and retraining in production?"
              ],
              [
                "Describe your experience with deep learning frameworks and architectures.",
                "What's your experience been like working with deep learning frameworks and various architectures?",
                "How do you work with deep learning frameworks and what architectures are you most familiar with?",
                "Could you share your experience with deep learning frameworks and architectures?"
              ],
              [
                "How do you ensure your ML models are fair and unbiased?",
                "What's your approach to ensuring fairness and reducing bias in your machine learning models?",
                "How do you go about making sure your ML models are fair and unbiased?",
                "Could you tell me about your strategy for ensuring model fairness and reducing bias?"
              ],
              [
                "What's your approach to feature engineering and data preprocessing?",
                "How do you approach feature engineering and what's your process for data preprocessing?",
                "What's your methodology for feature engineering and how do you handle data preprocessing?",
                "Could you walk me through your approach to feature engineering and data preprocessing?"
              ],
              [
                "Tell me about your experience with MLOps and model lifecycle management.",
                "What's your experience been like with MLOps and managing the machine learning model lifecycle?",
                "How do you work with MLOps and what's your experience with model lifecycle management?",
                "Could you share your experience with MLOps and model lifecycle management?"
              ],
              [
                "How do you handle the trade-off between model accuracy and interpretability?",
                "What's your approach to balancing model accuracy with interpretability requirements?",
                "How do you navigate the trade-off between accuracy and interpretability in your models?",
                "Could you tell me about your strategy for balancing accuracy and interpretability?"
              ],
              [
                "What's your experience with real-time inference and model serving?",
                "How do you work with real-time inference and what's your experience with model serving?",
                "What's your experience been like with real-time inference and model serving systems?",
                "Could you share your experience with real-time inference and model serving?"
              ],
              [
                "How do you validate and test your machine learning models?",
                "What's your approach to validating and testing machine learning models?",
                "How do you go about validating and testing your ML models?",
                "Could you walk me through your process for validating and testing machine learning models?"
              ],
              [
                "Tell me about your experience with big data technologies for ML applications.",
                "What's your experience been like working with big data technologies for machine learning applications?",
                "How do you work with big data technologies and what's your experience with ML applications?",
                "Could you share your experience with big data technologies for machine learning?"
              ]
            ],
            "hr-executive": [
              [
                "Tell me about your experience with recruitment and talent acquisition processes.",
                "What's your experience been like with recruitment and talent acquisition?",
                "How do you approach recruitment and what's your experience with talent acquisition?",
                "Could you share your experience with recruitment and talent acquisition processes?"
              ],
              [
                "How do you handle difficult employee relations situations?",
                "What's your approach to managing difficult employee relations scenarios?",
                "How do you go about handling challenging employee relations situations?",
                "Could you tell me about your strategy for managing difficult employee relations?"
              ],
              [
                "Describe your approach to performance management and employee development.",
                "What's your approach to performance management and how do you handle employee development?",
                "How do you approach performance management and what's your strategy for employee development?",
                "Could you walk me through your approach to performance management and employee development?"
              ],
              [
                "What's your experience with HR policies and compliance requirements?",
                "How do you work with HR policies and what's your experience with compliance requirements?",
                "What's your experience been like with HR policies and ensuring compliance?",
                "Could you share your experience with HR policies and compliance management?"
              ],
              [
                "How do you stay updated with employment laws and regulations?",
                "What's your approach to staying current with employment laws and regulatory changes?",
                "How do you keep up with employment laws and what's your process for staying updated?",
                "Could you tell me about how you stay informed about employment laws and regulations?"
              ],
              [
                "Tell me about a time when you had to mediate a conflict between employees.",
                "Can you share an experience where you had to mediate a conflict between team members?",
                "What's an example of a time when you had to mediate an employee conflict?",
                "Could you walk me through a time when you had to mediate a conflict between employees?"
              ],
              [
                "What's your approach to building a positive company culture?",
                "How do you approach building and maintaining a positive company culture?",
                "What's your strategy for fostering a positive company culture?",
                "Could you tell me about your approach to building a positive company culture?"
              ],
              [
                "How do you handle sensitive employee information and maintain confidentiality?",
                "What's your approach to handling sensitive employee information while maintaining confidentiality?",
                "How do you go about managing sensitive employee information and ensuring confidentiality?",
                "Could you tell me about your strategy for handling sensitive employee information?"
              ],
              [
                "Tell me about your experience with HR technology and systems.",
                "What's your experience been like working with HR technology and various systems?",
                "How do you work with HR technology and what systems are you most familiar with?",
                "Could you share your experience with HR technology and systems?"
              ],
              [
                "How do you measure the effectiveness of HR programs and initiatives?",
                "What's your approach to measuring the effectiveness of HR programs and initiatives?",
                "How do you go about evaluating the success of HR programs and initiatives?",
                "Could you tell me about your strategy for measuring HR program effectiveness?"
              ]
            ],
            "sales-executive": [
              [
                "Tell me about your most successful sales achievement and how you accomplished it.",
                "Can you share your most significant sales achievement and how you made it happen?",
                "What's your biggest sales success story and how did you achieve it?",
                "Could you walk me through your most successful sales achievement?"
              ],
              [
                "How do you handle rejection and maintain motivation in sales?",
                "What's your approach to handling rejection and staying motivated in sales?",
                "How do you go about dealing with rejection and maintaining motivation?",
                "Could you tell me about your strategy for handling rejection in sales?"
              ],
              [
                "Describe your sales process and how you qualify leads.",
                "What's your sales process like and how do you go about qualifying leads?",
                "How do you approach your sales process and what's your lead qualification strategy?",
                "Could you walk me through your sales process and lead qualification approach?"
              ],
              [
                "What's your experience with CRM systems and sales tools?",
                "How do you work with CRM systems and what's your experience with sales tools?",
                "What's your experience been like with CRM systems and various sales tools?",
                "Could you share your experience with CRM systems and sales tools?"
              ],
              [
                "How do you build and maintain relationships with clients?",
                "What's your approach to building and maintaining strong client relationships?",
                "How do you go about building and sustaining relationships with your clients?",
                "Could you tell me about your strategy for building and maintaining client relationships?"
              ],
              [
                "Tell me about a time when you had to overcome a major sales objection.",
                "Can you share an experience where you had to overcome a significant sales objection?",
                "What's an example of a major sales objection you've had to overcome?",
                "Could you walk me through a time when you overcame a major sales objection?"
              ],
              [
                "What's your approach to understanding customer needs and pain points?",
                "How do you approach understanding customer needs and identifying pain points?",
                "What's your methodology for understanding customer needs and pain points?",
                "Could you tell me about your approach to understanding customer needs?"
              ],
              [
                "How do you handle competitive situations and differentiate your product?",
                "What's your approach to handling competitive situations and product differentiation?",
                "How do you go about managing competitive situations and differentiating your product?",
                "Could you tell me about your strategy for handling competitive situations?"
              ],
              [
                "Tell me about your experience with sales forecasting and pipeline management.",
                "What's your experience been like with sales forecasting and managing sales pipelines?",
                "How do you work with sales forecasting and what's your pipeline management experience?",
                "Could you share your experience with sales forecasting and pipeline management?"
              ],
              [
                "How do you stay motivated and achieve your sales targets?",
                "What's your approach to staying motivated and hitting your sales targets?",
                "How do you go about maintaining motivation and achieving your sales goals?",
                "Could you tell me about your strategy for staying motivated and achieving targets?"
              ]
            ],
            "marketing-manager": [
              [
                "Tell me about a successful marketing campaign you managed from concept to execution.",
                "Can you share an example of a successful marketing campaign you managed end-to-end?",
                "What's an example of a successful marketing campaign you've managed from start to finish?",
                "Could you walk me through a successful marketing campaign you managed?"
              ],
              [
                "How do you measure the ROI of marketing campaigns and initiatives?",
                "What's your approach to measuring ROI for marketing campaigns and initiatives?",
                "How do you go about measuring the return on investment for marketing efforts?",
                "Could you tell me about your strategy for measuring marketing ROI?"
              ],
              [
                "Describe your experience with digital marketing channels and strategies.",
                "What's your experience been like with digital marketing channels and various strategies?",
                "How do you work with digital marketing channels and what strategies are you most familiar with?",
                "Could you share your experience with digital marketing channels and strategies?"
              ],
              [
                "What's your approach to understanding target audiences and market research?",
                "How do you approach understanding target audiences and conducting market research?",
                "What's your methodology for understanding target audiences and market research?",
                "Could you walk me through your approach to target audience analysis and market research?"
              ],
              [
                "How do you stay updated with marketing trends and best practices?",
                "What's your approach to staying current with marketing trends and industry best practices?",
                "How do you keep up with marketing trends and what's your process for staying updated?",
                "Could you tell me about how you stay informed about marketing trends and best practices?"
              ],
              [
                "Tell me about a time when you had to pivot a marketing strategy due to market changes.",
                "Can you share an experience where you had to pivot a marketing strategy because of market changes?",
                "What's an example of a time when you had to pivot a marketing strategy?",
                "Could you walk me through a time when you had to pivot a marketing strategy?"
              ],
              [
                "What's your experience with marketing automation and analytics tools?",
                "How do you work with marketing automation and what's your experience with analytics tools?",
                "What's your experience been like with marketing automation and analytics platforms?",
                "Could you share your experience with marketing automation and analytics tools?"
              ],
              [
                "How do you collaborate with other departments to align marketing efforts?",
                "What's your approach to collaborating with other departments and aligning marketing efforts?",
                "How do you go about working with other departments to ensure marketing alignment?",
                "Could you tell me about your strategy for cross-departmental collaboration in marketing?"
              ],
              [
                "Tell me about your experience with brand management and positioning.",
                "What's your experience been like with brand management and positioning strategies?",
                "How do you work with brand management and what's your experience with positioning?",
                "Could you share your experience with brand management and positioning?"
              ],
              [
                "How do you handle budget constraints while maximizing marketing impact?",
                "What's your approach to managing budget constraints while maximizing marketing impact?",
                "How do you go about handling budget limitations while maximizing marketing effectiveness?",
                "Could you tell me about your strategy for maximizing marketing impact with budget constraints?"
              ]
            ],
            "cybersecurity-analyst": [
              [
                "Tell me about a security incident you investigated and how you resolved it.",
                "Can you share an example of a security incident you investigated and resolved?",
                "What's an example of a security incident you've investigated and how did you handle it?",
                "Could you walk me through a security incident you investigated and resolved?"
              ],
              [
                "How do you stay updated with the latest cybersecurity threats and trends?",
                "What's your approach to staying current with cybersecurity threats and emerging trends?",
                "How do you keep up with the latest cybersecurity threats and what's your process for staying updated?",
                "Could you tell me about how you stay informed about cybersecurity threats and trends?"
              ],
              [
                "Describe your experience with security tools and technologies.",
                "What's your experience been like working with security tools and various technologies?",
                "How do you work with security tools and what technologies are you most familiar with?",
                "Could you share your experience with security tools and technologies?"
              ],
              [
                "What's your approach to vulnerability assessment and penetration testing?",
                "How do you approach vulnerability assessment and what's your process for penetration testing?",
                "What's your methodology for vulnerability assessment and penetration testing?",
                "Could you walk me through your approach to vulnerability assessment and penetration testing?"
              ],
              [
                "How do you handle security breaches and incident response?",
                "What's your approach to handling security breaches and managing incident response?",
                "How do you go about managing security breaches and what's your incident response strategy?",
                "Could you tell me about your strategy for handling security breaches and incident response?"
              ],
              [
                "Tell me about your experience with compliance frameworks like SOC 2 or ISO 27001.",
                "What's your experience been like working with compliance frameworks such as SOC 2 or ISO 27001?",
                "How do you work with compliance frameworks and what's your experience with SOC 2 or ISO 27001?",
                "Could you share your experience with compliance frameworks like SOC 2 or ISO 27001?"
              ],
              [
                "What's your approach to security awareness training and education?",
                "How do you approach security awareness training and what's your education strategy?",
                "What's your methodology for security awareness training and education programs?",
                "Could you walk me through your approach to security awareness training and education?"
              ],
              [
                "How do you balance security requirements with business needs?",
                "What's your approach to balancing security requirements with business objectives?",
                "How do you go about balancing security needs with business requirements?",
                "Could you tell me about your strategy for balancing security and business needs?"
              ],
              [
                "Tell me about your experience with threat intelligence and monitoring.",
                "What's your experience been like working with threat intelligence and monitoring systems?",
                "How do you work with threat intelligence and what's your monitoring experience?",
                "Could you share your experience with threat intelligence and monitoring?"
              ],
              [
                "How do you communicate security risks to non-technical stakeholders?",
                "What's your approach to communicating security risks to non-technical stakeholders?",
                "How do you go about explaining security risks to business stakeholders?",
                "Could you tell me about your strategy for communicating security risks to non-technical audiences?"
              ]
            ],
            "business-analyst": [
              [
                "Tell me about a complex business problem you analyzed and the solution you proposed.",
                "Can you share an example of a complex business problem you analyzed and solved?",
                "What's an example of a complex business problem you've analyzed and what solution did you propose?",
                "Could you walk me through a complex business problem you analyzed and resolved?"
              ],
              [
                "How do you gather and document business requirements from stakeholders?",
                "What's your approach to gathering and documenting business requirements from stakeholders?",
                "How do you go about collecting and documenting business requirements?",
                "Could you tell me about your strategy for gathering and documenting business requirements?"
              ],
              [
                "Describe your experience with data analysis and business intelligence tools.",
                "What's your experience been like working with data analysis and business intelligence tools?",
                "How do you work with data analysis tools and what's your experience with BI platforms?",
                "Could you share your experience with data analysis and business intelligence tools?"
              ],
              [
                "What's your approach to process improvement and optimization?",
                "How do you approach process improvement and what's your optimization strategy?",
                "What's your methodology for process improvement and optimization?",
                "Could you walk me through your approach to process improvement and optimization?"
              ],
              [
                "How do you handle conflicting requirements from different stakeholders?",
                "What's your approach to managing conflicting requirements from various stakeholders?",
                "How do you go about handling conflicting requirements from different stakeholders?",
                "Could you tell me about your strategy for managing conflicting stakeholder requirements?"
              ],
              [
                "Tell me about a time when you had to present complex data to senior management.",
                "Can you share an experience where you had to present complex data to senior management?",
                "What's an example of a time when you had to present complex data to senior leaders?",
                "Could you walk me through a time when you presented complex data to senior management?"
              ],
              [
                "What's your experience with project management and agile methodologies?",
                "How do you work with project management and what's your experience with agile methodologies?",
                "What's your experience been like with project management and agile frameworks?",
                "Could you share your experience with project management and agile methodologies?"
              ],
              [
                "How do you ensure the solutions you propose align with business objectives?",
                "What's your approach to ensuring your proposed solutions align with business objectives?",
                "How do you go about making sure your solutions align with business goals?",
                "Could you tell me about your strategy for aligning solutions with business objectives?"
              ],
              [
                "Tell me about your experience with user acceptance testing and validation.",
                "What's your experience been like with user acceptance testing and validation processes?",
                "How do you work with user acceptance testing and what's your validation experience?",
                "Could you share your experience with user acceptance testing and validation?"
              ],
              [
                "How do you stay updated with industry trends and best practices?",
                "What's your approach to staying current with industry trends and best practices?",
                "How do you keep up with industry trends and what's your process for staying updated?",
                "Could you tell me about how you stay informed about industry trends and best practices?"
              ]
            ],
            "finance-analyst": [
              [
      "Tell me about a financial analysis project where you identified significant insights.",
      "Can you share an example of a financial analysis project where you uncovered important insights?",
      "What's an example of a financial analysis project you've worked on that revealed significant findings?",
      "Could you walk me through a financial analysis project where you identified key insights?"
    ],
    [
      "How do you approach financial modeling and forecasting?",
      "What's your approach to financial modeling and how do you handle forecasting?",
      "How do you go about financial modeling and what's your forecasting methodology?",
      "Could you tell me about your approach to financial modeling and forecasting?"
    ],
    [
      "Describe your experience with financial reporting and analysis tools.",
      "What's your experience been like working with financial reporting and analysis tools?",
      "How do you work with financial reporting tools and what's your analysis experience?",
      "Could you share your experience with financial reporting and analysis tools?"
    ],
    [
      "What's your approach to risk assessment and financial risk management?",
      "How do you approach risk assessment and what's your strategy for financial risk management?",
      "What's your methodology for risk assessment and how do you handle financial risk management?",
      "Could you walk me through your approach to risk assessment and financial risk management?"
    ],
    [
      "How do you ensure accuracy and compliance in financial reporting?",
      "What's your approach to ensuring accuracy and compliance in financial reporting?",
      "How do you go about maintaining accuracy and ensuring compliance in financial reporting?",
      "Could you tell me about your strategy for ensuring accuracy and compliance in financial reporting?"
    ],
    [
      "Tell me about your experience with budgeting and variance analysis.",
      "What's your experience been like with budgeting and conducting variance analysis?",
      "How do you work with budgeting and what's your experience with variance analysis?",
      "Could you share your experience with budgeting and variance analysis?"
    ],
    [
      "What's your approach to communicating financial data to non-financial stakeholders?",
      "How do you approach communicating financial data to non-financial stakeholders?",
      "What's your methodology for explaining financial data to non-financial audiences?",
      "Could you walk me through your approach to communicating financial data to non-financial stakeholders?"
    ],
    [
      "How do you stay updated with accounting standards and financial regulations?",
      "What's your approach to staying current with accounting standards and financial regulations?",
      "How do you keep up with accounting standards and what's your process for staying updated?",
      "Could you tell me about how you stay informed about accounting standards and financial regulations?"
    ],
    [
      "Tell me about a time when you had to analyze complex financial data under pressure.",
      "Can you share an experience where you had to analyze complex financial data under time pressure?",
      "What's an example of a time when you had to analyze complex financial data under pressure?",
      "Could you walk me through a time when you had to analyze complex financial data under pressure?"
    ],
    [
      "What's your experience with investment analysis and portfolio management?",
      "How do you work with investment analysis and what's your experience with portfolio management?",
      "What's your experience been like with investment analysis and portfolio management?",
      "Could you share your experience with investment analysis and portfolio management?"
    ]
  ]
};

const StarRating = ({ score, maxScore = 10 }: { score: number; maxScore?: number }) => {
  const stars = [];
  for (let i = 1; i <= maxScore; i++) {
    stars.push(
      <Star
        key={i}
        className={`h-4 w-4 ${
          i <= score ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }
  return <div className="flex gap-1">{stars}</div>;
};

const InterviewSession = ({ role, onComplete, onBack }: InterviewSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [generatingFeedback, setGeneratingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [parsedScores, setParsedScores] = useState<any>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [testQuestion, setTestQuestion] = useState("");
  const [testAnswer, setTestAnswer] = useState("");
  const [testFeedback, setTestFeedback] = useState("");
  const [generatingTestFeedback, setGeneratingTestFeedback] = useState(false);

  const [inputMethod, setInputMethod] = useState<'text' | 'voice'>('text');

  const parseScores = (feedback: string) => {
    const scores: any = {};
    
    // Extract overall score
    const overallMatch = feedback.match(/Overall Score:\s*(\d+)/i);
    if (overallMatch) scores.overall = parseInt(overallMatch[1]);
    
    // Extract individual scores
    const correctnessMatch = feedback.match(/Correctness:\s*(\d+)/i);
    if (correctnessMatch) scores.correctness = parseInt(correctnessMatch[1]);
    
    const relevanceMatch = feedback.match(/Relevance:\s*(\d+)/i);
    if (relevanceMatch) scores.relevance = parseInt(relevanceMatch[1]);
    
    const depthMatch = feedback.match(/Depth & Detail:\s*(\d+)/i);
    if (depthMatch) scores.depth = parseInt(depthMatch[1]);
    
    const communicationMatch = feedback.match(/Communication:\s*(\d+)/i);
    if (communicationMatch) scores.communication = parseInt(communicationMatch[1]);
    
    return scores;
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Get questions for the selected role, or use default questions
        let roleQuestions: string[] = [];
        
        // Test if roleQuestionsMap is working
        if (roleQuestionsMap && roleQuestionsMap[role]) {
          // Select a random variation for each question to ensure variety
          roleQuestions = roleQuestionsMap[role].map(questionVariations => {
            const randomIndex = Math.floor(Math.random() * questionVariations.length);
            return questionVariations[randomIndex];
          });
        } else {
          // Default questions with variations
          const defaultQuestionVariations = [
            [
              "Tell me about yourself and your experience in this field.",
              "To begin, could you tell me a bit about yourself and how your experience aligns with this role?",
              "I'd like to start by learning more about your background and experience in this field.",
              "Could you walk me through your professional background and how it relates to this position?"
            ],
            [
              "What are your greatest strengths and how do they apply to this position?",
              "What would you say are your key strengths and how do they translate to this role?",
              "Could you tell me about your main strengths and how they would benefit this position?",
              "What are your strongest qualities and how do they align with what we're looking for?"
            ],
            [
              "Describe a challenging situation you faced and how you handled it.",
              "Can you share an example of a difficult situation you encountered and how you managed it?",
              "Tell me about a challenging scenario you've faced and what your approach was.",
              "Could you walk me through a tough situation you handled and how you resolved it?"
            ],
            [
              "Why are you interested in this role and our company?",
              "What draws you to this particular role and what interests you about our company?",
              "Could you tell me what attracted you to this position and our organization?",
              "What's your motivation for pursuing this role and what appeals to you about our company?"
            ],
            [
              "Tell me about a time when you had to work under pressure.",
              "Can you share an experience where you had to perform under significant pressure?",
              "What's an example of a time when you had to work under pressure and how did you handle it?",
              "Could you describe a situation where you had to work under pressure and what your approach was?"
            ],
            [
              "How do you handle feedback and criticism?",
              "What's your approach to receiving and processing feedback and criticism?",
              "How do you typically respond to feedback and criticism in your work?",
              "Could you tell me about how you handle feedback and criticism from others?"
            ],
            [
              "Describe a time when you had to learn something new quickly.",
              "Can you share an experience where you needed to learn something new in a short timeframe?",
              "What's an example of a time when you had to rapidly learn a new skill or technology?",
              "Could you walk me through a situation where you had to learn something new quickly?"
            ],
            [
              "What motivates you in your work?",
              "What drives you and keeps you motivated in your professional work?",
              "What are the key factors that motivate you in your career?",
              "Could you tell me about what motivates you and keeps you engaged in your work?"
            ],
            [
              "How do you prioritize tasks when everything seems urgent?",
              "What's your approach to prioritizing when you have multiple urgent tasks?",
              "How do you handle situations where everything appears to be a priority?",
              "Could you share your strategy for prioritizing tasks when everything seems urgent?"
            ],
            [
              "Where do you see yourself in 5 years and how does this role fit your goals?",
              "What are your career goals for the next 5 years and how does this position align with them?",
              "Could you tell me about your 5-year career vision and how this role fits into that?",
              "What's your career trajectory for the next 5 years and how does this opportunity fit?"
            ]
          ];
          
          roleQuestions = defaultQuestionVariations.map(questionVariations => {
            const randomIndex = Math.floor(Math.random() * questionVariations.length);
            return questionVariations[randomIndex];
          });
        }
        
        if (!roleQuestions || roleQuestions.length === 0) {
          setLoading(false);
          return;
        }
        setQuestions(roleQuestions);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [role]);

  const speakText = async (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    try {
      // Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis failed:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleVoiceTranscription = (transcribedText: string) => {
    setCurrentAnswer(transcribedText);
  };

  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) return;
    
    setGeneratingFeedback(true);
    try {
      console.log("Calling Gemini API for analysis...");
      const result = await directGeminiService.analyzeAnswer(
        questions[currentQuestionIndex],
        currentAnswer,
        role
      );
      console.log("Gemini API response:", result);
      
      const scores = parseScores(result);
      setParsedScores(scores);
      setFeedback(result);
      
      // Add answer to answers array
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = currentAnswer;
      setAnswers(newAnswers);
      
    } catch (error) {
      console.error("Analysis failed:", error);
      setFeedback("Analysis failed. Please try again.");
    } finally {
      setGeneratingFeedback(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
      setFeedback("");
      setParsedScores(null);
    } else {
      // Interview complete
      const results = {
        role,
        questions,
        answers: [...answers, currentAnswer],
        feedback: [feedback]
      };
      onComplete(results);
    }
  };

  const handleTestEvaluation = async () => {
    if (!testQuestion.trim() || !testAnswer.trim()) return;
    
    setGeneratingTestFeedback(true);
    try {
      console.log("Calling Gemini API for test analysis...");
      const result = await directGeminiService.analyzeAnswer(
        testQuestion,
        testAnswer,
        role
      );
      console.log("Test analysis result:", result);
      setTestFeedback(result);
    } catch (error) {
      console.error("Test analysis failed:", error);
      setTestFeedback("Analysis failed. Please try again.");
    } finally {
      setGeneratingTestFeedback(false);
    }
  };

  const resetTestMode = () => {
    setTestQuestion("");
    setTestAnswer("");
    setTestFeedback("");
    setGeneratingTestFeedback(false);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;



  if (!role) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No Role Selected</h2>
            <p className="text-gray-400">Please go back and select a role.</p>
            <Button onClick={onBack} className="mt-4">
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <span className="ml-2 text-white">Loading questions...</span>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">No Questions Available</h2>
            <p className="text-gray-400">Unable to load questions for this role.</p>
            <Button onClick={onBack} className="mt-4">
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Interview Practice Session
          </h1>
          <p className="text-lg text-gray-300">
            Role: {role}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Welcome Card */}
        {currentQuestionIndex === 0 && (
          <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 backdrop-blur-sm mb-8">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">Welcome to Your Interview Practice Session!</CardTitle>
                  <p className="text-blue-300">Tips for success:</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use the voice recorder for natural speech-to-text answers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Click the speaker icon to hear questions read aloud</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Take your time to think before answering</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use the STAR method (Situation, Task, Action, Result) for behavioral questions</p>
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Customize voice settings for your preferred interviewer voice</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4">
                <Badge variant="secondary" className="bg-green-900/20 text-green-300 border-green-500/30">
                  <Mic className="h-3 w-3 mr-1" />
                  Voice Input Available
                </Badge>
                <Badge variant="secondary" className="bg-blue-900/20 text-blue-300 border-blue-500/30">
                  <Volume2 className="h-3 w-3 mr-1" />
                  Text-to-Speech Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Card */}
        <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                {currentQuestionIndex + 1}
              </div>
              <span className="text-xl">Question {currentQuestionIndex + 1}</span>
                              <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(questions[currentQuestionIndex])}
                  disabled={isSpeaking}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                {isSpeaking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-200 leading-relaxed">
              {questions[currentQuestionIndex]}
            </p>
          </CardContent>
        </Card>

        {/* Answer Input */}
        <Card className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <span className="text-xl">Your Answer</span>
              <div className="flex items-center gap-2">
                <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'text' | 'voice')} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
                    <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                      <Keyboard className="h-4 w-4" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center gap-2 data-[state=active]:bg-blue-600">
                      <Mic className="h-4 w-4" />
                      Voice
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'text' | 'voice')}>
              <TabsContent value="text" className="space-y-4">
                <Textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[200px] bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {currentAnswer.length} characters • {currentAnswer.split(' ').length} words
                    </span>
                    {currentAnswer.length > 0 && currentAnswer.length < 100 && (
                      <span className="text-xs text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/30">
                        💡 Tip: Consider adding more detail to your answer
                      </span>
                    )}
                    {currentAnswer.length > 500 && (
                      <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-500/30">
                        ✅ Good length for a comprehensive answer
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!currentAnswer.trim() || generatingFeedback}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {generatingFeedback ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Submit Answer"
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="voice" className="space-y-4">
                <VoiceRecorder
                  onTranscriptionComplete={handleVoiceTranscription}
                  maxDuration={60000} // 60 seconds for interview answers
                  autoTranscribe={true}
                  placeholder="Click the microphone to start recording your interview answer..."
                />
                {currentAnswer && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-white">Your Answer:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          {currentAnswer.length} characters • {currentAnswer.split(' ').length} words
                        </span>
                        {currentAnswer.length > 0 && currentAnswer.length < 100 && (
                          <span className="text-xs text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/30">
                            💡 Consider adding more detail
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-700/50 border border-gray-600 rounded-md">
                      <p className="text-sm leading-relaxed text-gray-200">{currentAnswer}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAnswerSubmit}
                        disabled={!currentAnswer.trim() || generatingFeedback}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {generatingFeedback ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Submit Answer"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Test Mode */}
        {testMode && (
          <div className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5 text-blue-600" />
                  Test AI Evaluation System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question:</label>
                  <Textarea
                    value={testQuestion}
                    onChange={(e) => setTestQuestion(e.target.value)}
                    placeholder="Enter any interview question to test..."
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Answer:</label>
                  <Textarea
                    value={testAnswer}
                    onChange={(e) => setTestAnswer(e.target.value)}
                    placeholder="Enter your answer here..."
                    className="min-h-[120px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleTestEvaluation}
                    disabled={!testQuestion.trim() || !testAnswer.trim() || generatingTestFeedback}
                    variant="default"
                  >
                    {generatingTestFeedback ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Evaluate Answer"
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setTestQuestion("Tell me about a challenging project you worked on and how you handled it.");
                      setTestAnswer("I worked on a project where we had to migrate a legacy system. It was challenging because the old system was poorly documented. I organized the team, created a detailed migration plan, and we completed it on time.");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Load Sample
                  </Button>
                  <Button
                    onClick={resetTestMode}
                    variant="outline"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Test Questions */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-sm">Quick Test Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestQuestion("What are your greatest strengths and how do they apply to this position?");
                      setTestAnswer("React is good.");
                    }}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">Sample 1: Very Poor Answer</div>
                      <div className="text-xs text-muted-foreground mt-1">Should get 1-2/10 score</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestQuestion("Describe a time when you had to work under pressure and how you handled it.");
                      setTestAnswer("In my previous role, we had a critical deadline for a client project. The team was struggling with a complex integration issue. I took the initiative to break down the problem into smaller tasks, assigned them to team members based on their strengths, and we worked overtime to meet the deadline. The project was delivered on time and the client was very satisfied with the results.");
                    }}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">Sample 2: Excellent STAR Answer</div>
                      <div className="text-xs text-muted-foreground mt-1">Should get 8-10/10 score</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestQuestion("How do you handle feedback and criticism?");
                      setTestAnswer("I welcome feedback as it helps me grow. I listen carefully, ask clarifying questions, and implement the suggestions. I don't take it personally.");
                    }}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">Sample 3: Average Answer</div>
                      <div className="text-xs text-muted-foreground mt-1">Should get 5-7/10 score</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestQuestion("Tell me about a challenging technical problem you solved.");
                      setTestAnswer("I had to optimize a database query that was taking 30 seconds to run. I analyzed the execution plan, added proper indexes, and restructured the query. This reduced the execution time to under 2 seconds, improving the user experience significantly.");
                    }}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">Sample 4: Technical Answer</div>
                      <div className="text-xs text-muted-foreground mt-1">Should get 7-9/10 score</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestQuestion("Why do you want to work for our company?");
                      setTestAnswer("I like coding and your company seems cool. I want to make money and learn new things.");
                    }}
                    className="text-left justify-start h-auto p-3"
                  >
                    <div>
                      <div className="font-medium">Sample 5: Unprofessional Answer</div>
                      <div className="text-xs text-muted-foreground mt-1">Should get 2-4/10 score</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {testFeedback && (
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    🤖 AI Evaluation Result
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(testFeedback)}
                      disabled={isSpeaking}
                      className="p-2"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {testFeedback}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            {parsedScores && (
              <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">AI Evaluation Result</CardTitle>
                      <p className="text-sm text-blue-300">Powered by Gemini AI</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {parsedScores.overall || 0}/10
                    </div>
                    <div className="text-sm text-gray-300">
                      {parsedScores.overall >= 8 ? "Excellent" : 
                       parsedScores.overall >= 6 ? "Good" : 
                       parsedScores.overall >= 4 ? "Fair" : "Needs Improvement"}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(parsedScores.overall || 0) * 10}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Scoring */}
            {parsedScores && (
              <Card className="bg-gray-800/50 border border-gray-600/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-xl">📊</span>
                    Detailed Scoring Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                          Correctness
                        </span>
                        <StarRating score={parsedScores.correctness || 0} />
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(parsedScores.correctness || 0) * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-pink-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                          Relevance
                        </span>
                        <StarRating score={parsedScores.relevance || 0} />
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(parsedScores.relevance || 0) * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                          Depth & Detail
                        </span>
                        <StarRating score={parsedScores.depth || 0} />
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(parsedScores.depth || 0) * 10}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-300 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          Communication
                        </span>
                        <StarRating score={parsedScores.communication || 0} />
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(parsedScores.communication || 0) * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Analysis */}
            <Card className="bg-gray-800/50 border border-gray-600/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    Detailed Analysis
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(feedback)}
                    disabled={isSpeaking}
                    className="p-2 text-blue-400 hover:text-blue-300"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths Section */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-400 text-lg">✅</span>
                    <h4 className="font-semibold text-green-300">Strengths</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-green-200 text-sm">Minimal response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-green-200 text-sm">Basic attempt</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-green-200 text-sm">Shows effort</span>
                    </div>
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-orange-400 text-lg">⚠️</span>
                    <h4 className="font-semibold text-orange-300">Areas for Improvement</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-orange-200 text-sm">Provide comprehensive detail and explanation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-orange-200 text-sm">Include specific examples and experiences</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                      <span className="text-orange-200 text-sm">Use the STAR method for comprehensive responses</span>
                    </div>
                  </div>
                </div>

                {/* Key Recommendation */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-400 text-lg">💡</span>
                    <h4 className="font-semibold text-blue-300">Key Recommendation</h4>
                  </div>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    This answer needs major improvement. Provide detailed responses with specific examples and experiences.
                  </p>
                </div>

                {/* Detailed Analysis */}
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-purple-400 text-lg">📝</span>
                    <h4 className="font-semibold text-purple-300">Detailed Analysis</h4>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    This answer is extremely brief and lacks the detail needed for an effective interview response. Consider expanding significantly. Your answer has {currentAnswer.length} characters and {currentAnswer.split(' ').length} words. This is too brief for an effective interview response. Consider adding more concrete examples from your experience.
                  </p>
                </div>

                {/* Word Count Stats */}
                <div className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{currentAnswer.split(' ').length}</div>
                        <div className="text-xs text-gray-400">Words</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{currentAnswer.length}</div>
                        <div className="text-xs text-gray-400">Characters</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">AI Analysis Complete</div>
                      <div className="text-xs text-green-400">✓ Processed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        {feedback && (
          <div className="space-y-4">
            {/* Progress Encouragement */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Great job on question {currentQuestionIndex + 1}!
                      </p>
                      <p className="text-xs text-green-600">
                        {currentQuestionIndex === questions.length - 1 
                          ? "This was your final question!" 
                          : `${questions.length - currentQuestionIndex - 1} more questions to go!`}
                      </p>
                    </div>
                  </div>
                  {parsedScores?.overall && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {parsedScores.overall}/10
                      </div>
                      <div className="text-xs text-green-600">Score</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setCurrentAnswer(answers[currentQuestionIndex - 1] || "");
                  setFeedback("");
                  setParsedScores(null);
                }}
                disabled={currentQuestionIndex === 0}
              >
                Previous Question
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!feedback}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next Question"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSession; 