import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as Element from "../elements/options";
import { answerQuestion, getSession } from "../actions/mode12";

import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { AnswerLayout } from "../elements/mode12Screen";
import { ButtonNext } from "../elements/mode12Screen";

const Options = ({
  answers,
  correctAnswer,
  answerQuestion,
  question,
  selectedAnswer,
  setselectedAnswer,
  getSession
}) => {
  const [selectedAnswerLocal, setselectedAnswerLocal] = useState("");
  const [radioDisabled, setRadioDisabled] = useState(false)

  useEffect(
    function () {
      const button = document.getElementById("button-next");
      if (selectedAnswerLocal == "") {
        button.disabled = true;
      }
      else {
        button.disabled = false;
      }

    },
    [selectedAnswerLocal]
  );

  useEffect(() => {
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = false;
    }

    const button = document.getElementById("button-next");
    button.disabled = true;

    setRadioDisabled(false);

    const correctLabel = document.getElementById("correct-answer-label");
    correctLabel.innerHTML = "&#8203;";

    const buttonFinish = document.getElementById("finish-learning-button");
    buttonFinish.disabled = false;
  }, [answers])

  function handleAnswerClick() {
    answerQuestion(selectedAnswerLocal);
    const button = document.getElementById("button-next");
    button.disabled = true;

    const buttonFinish = document.getElementById("finish-learning-button");
    buttonFinish.disabled = true;

    setRadioDisabled(true);

    const correctLabel = document.getElementById("correct-answer-label");
    correctLabel.innerHTML = "Correct Answer: " + correctAnswer;

    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
      button.disabled = true;
    }

    if (correctAnswer == selectedAnswerLocal) {
      correctLabel.style.color = "green";
    }
    else {
      correctLabel.style.color = "red";     
    }
    setTimeout(() => {
      getSession();
    }, 3000);
  }

  return (
    <Box sx={{ width: '100%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <FormLabel
        id="answer-label"
        sx={{
          textAlign: 'center',
          mb: 2,
          fontWeight: 'xl',
          textTransform: 'uppercase',
          fontSize: 'xs',
          letterSpacing: '0.15rem',
        }}
      >
        {""}
      </FormLabel>
      <RadioGroup
        defaultValue=""
        size="lg"
        sx={{ gap: 1.5, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
      >
        <AnswerLayout>
        {answers.map((value) => (
          <Sheet
            key={value}
            sx={{
              p: 2,
              borderRadius: 'md',
              boxShadow: 'sm',
            }}
          >
            <Radio
              disabled={radioDisabled}
              className="radio-buttons"
              label={`${value}`}
              overlay
              onChange={() => {
                setselectedAnswerLocal(value);
              }}
              disableIcon
              value={value}
              slotProps={{
                label: ({ checked }) => ({
                  sx: {
                    fontSize: '21px',
                    color: checked ? 'text.primary' : 'text.secondary',
                    alignItems: 'center',
                    justifyContent: 'center'
                  },
                }),
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      '--variant-borderWidth': '2px',
                      '&&': {
                        // && to increase the specificity to win the base :hover styles
                        borderColor: theme.vars.palette.primary[500],
                      },
                    }),
                  }),
                }),
              }}
            />
          </Sheet>
        ))}
      </AnswerLayout>
      <label id="correct-answer-label" style={{color: 'green'}}>&#8203;</label>
      <ButtonNext id="button-next" onClick={handleAnswerClick}>
                Submit Answer
              </ButtonNext>
      </RadioGroup>
    </Box>   /*<Element.OptionsDiv>
      {answers.map((ans) => (
        <Element.OptionButton
          style={{
            backgroundColor:
              ans === selectedAnswer
                ? ans === correctAnswer
                  ? "green"
                  : "red"
                : "",
          }}
          onClick={() => handleAnswerClick(ans)}
          key={ans}
        >
          {ans}
        </Element.OptionButton>
      ))}
    </Element.OptionsDiv>*/
  );
};

const mapStateToProps = (state) => ({
  correctAnswer: state.mode12Reducer.correct,
  question: state.mode12Reducer.question,
});

export default connect(mapStateToProps, { answerQuestion, getSession })(Options);
