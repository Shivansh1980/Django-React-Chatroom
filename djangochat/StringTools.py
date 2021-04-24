import json

class QuestionHelper:
    def compare_questions(self, questions, q):
        for question in questions:
            if (question.content == q):
                return True
        return False
    
    def to_json(data):
        return json.dumps(data)

    


    