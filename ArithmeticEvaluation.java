import java.util.*;
import java.util.stream.*;
import java.util.function.*;

/**
 *
 * @author d_Ar
 */
public final class ArithmeticEvaluation {

    private final static Map<String, Double> USES_CONSTANTS;

    static {
        USES_CONSTANTS = new HashMap<>();
        USES_CONSTANTS.put("e", Math.E);
        USES_CONSTANTS.put("pi", Math.PI);
        USES_CONSTANTS.put("E", Math.E);
        USES_CONSTANTS.put("PI", Math.PI);
    }

    private final static String ALLOWED_OPERATOR_CHARS = "+-*/%!";

    private final String input;

    private final StringBuilder buff;

    private final int length;

    private int pos;

    public ArithmeticEvaluation(final String input) {
        this.input = input.replaceAll(" ","");
        this.length = this.input.length();
        buff = new StringBuilder();
        pos = 0;
    }

    public interface Expression {
        boolean isUnary();
        boolean isBinary();
        double eval(double... values);
    }

    public interface Expressions {
        double evaluate();
    }

    public static final class Operator implements Expressions{

        public enum OperatorType {

            ADD('+', 1, true) {
                @Override
                public void matchArguments(int size) {

                }

                @Override
                public double exec(double... values) {
                    return values[0] + values[1];
                }
            };

            private final char symbol;
            private final boolean binary;
            private final int precedence;

            OperatorType(char symbol, int precedence, boolean binary) {
                this.symbol = symbol;
                this.precedence = precedence;
                this.binary = binary;
            }

            public char getSymbol() {
                return symbol;
            }

            public int getPrecedence() {
                return precedence;
            }

            @Override
            public String toString() {
                return String.valueOf(symbol);
            }

            public abstract void matchArguments(int size);

            public abstract double exec(double... values);
        }

        private final OperatorType type;
        private final double[] args;

        public Operator(OperatorType type, double...args) {
            this.type = type;
            this.args = args;
        }

        public Operator(OperatorType type) {
            this(type, new double[0]);
        }

        @Override
        public double evaluate() {
            return type.exec(args);
        }

        public OperatorType getType() {
            return type;
        }

        public double[] getArgs() {
            return args;
        }

        @Override
        public String toString() {
            return (args.length > 1) ?
                    "(" + args[0] + " " + type.getSymbol() + " " + args[1] + ")" :
                    "(" + type.getSymbol() + args[0]  + ")";
        }
    }

    public static final class Function implements Expressions{

        public enum FunctionType {

            SIN("sin", true) {
                @Override
                public void matchArguments(int size) {
                    if (size != 1) throw new IllegalArgumentException();
                }

                @Override
                public double exec(List<Double> values) {
                    matchArguments(values.size()); return Math.sin(values.get(0));
                }
            },

            COS("cos", true) {
                @Override
                public void matchArguments(int size) {
                    if (size != 1) throw new IllegalArgumentException();
                }

                @Override
                public double exec(List<Double> values) {
                    return Math.cos(values.get(0));
                }
            },

            POW("pow", false) {
                @Override
                public void matchArguments(int size) {
                    if (size != 2) throw new IllegalArgumentException();
                }

                @Override
                public double exec(List<Double> values) {
                    return Math.pow(values.get(0), values.get(1));
                }
            };

            private final String name;
            private final boolean unary;

            FunctionType(String name, boolean unary) {
                this.name = name;
                this.unary = unary;
            }

            public String getName() {
                return name;
            }

            public boolean isUnary() {
                return unary;
            }

            public boolean isBinary() {
                return !isUnary();
            }

            public boolean isManyArgs() {
                return isBinary();
            }

            public static FunctionType forFunction(String name) throws Exception{
                for (FunctionType type : values()) {
                    if (type.getName().equalsIgnoreCase(name)) return type;
                }
                throw new RuntimeException();
            }

            @Override
            public String toString() {
                return super.toString();
            }

            public abstract void matchArguments(int size);

            public abstract double exec(List<Double> values) throws IllegalArgumentException;
        }

        private final FunctionType type;
        private final List<Double> arguments;

        public Function(FunctionType type, List<Double> arguments) {
            this.type = type;
            this.arguments = arguments;
        }

        public Function(FunctionType type) {
            this(type, new ArrayList<>());
        }

        @Override
        public double evaluate() {
            return type.exec(arguments);
        }

        public void addArgument(double elem) {
            arguments.add(elem);
        }

        public FunctionType getType() {
            return type;
        }

        @Override
        public String toString() {
            return type.getName() + "(" + arguments.toString()+ ")";
        }
    }

    public enum OperatorType implements Expression {

        LPAREN('(', 0, false),
        COMMA(',', 0, true),
        ADD('+', 1, true),
        SUB('-', 1, true),
        MUL('*', 2, true),
        DIV('/', 2, true),
        MOD('%', 2, true),
        FACT('!', 3, false),
        PLUS('+', 4, false),
        NEGATE('-', 4, false); // ++ PLUS_PLUS, +- PLUS_MINUS, -- MINUS_MINUS, -+ MINUS_PLUS

        private final char symbol;
        private final int precedence;
        private final boolean binary;

        OperatorType(char symbol, int precedence, boolean binary) {
            this.symbol = symbol;
            this.precedence = precedence;
            this.binary = binary;
        }

        public char getSymbol() {
            return symbol;
        }

        public int getPrecedence() {
            return precedence;
        }

        @Override
        public boolean isBinary() {
            return binary;
        }

        @Override
        public boolean isUnary() {
            return !isBinary();
        }

        @Override
        public double eval(double... values) {  Function f = new Function(Function.FunctionType.POW, new ArrayList<>()); f.addArgument(12.); System.out.println(f); f.evaluate();
            switch (this) {
                case ADD: if (values.length == 2) return values[0] + values[1];
                case SUB: if (values.length == 2) return values[0] - values[1];
                case MUL: if (values.length == 2) return values[0] * values[1];
                case DIV: if (values.length == 2) return values[0] / values[1];
                case MOD: if (values.length == 2) return values[0] % values[1];
                case PLUS: if (values.length == 1) return values[0];
                case NEGATE: if (values.length == 1) return -values[0];
                case FACT: if (values.length == 1 && values[0] > 0) return LongStream.iterate((long) values[0], n -> n > 1, Math::decrementExact).reduce(1, (x, y) -> x * y);
                case LPAREN:
                case COMMA: return 0;
                default: break;
            }
            throw new IllegalStateException("Invalid operation");
        }

        @Override
        public String toString() {
            return String.valueOf(symbol);
        }

        public static OperatorType forSymbol(char symbol, boolean statement) throws Exception{
            return EnumSet.allOf(OperatorType.class)
                    .stream()
                    .filter(e -> e.getSymbol() == symbol && e.isUnary() == statement)
                    .findFirst()
                    .orElseThrow(Exception::new);
        }
    }

    public enum FunctionType implements Expression {

        SIN("sin", true),
        COS("cos", true),
        TAN("tg", true),
        CTAN("ctg", true),
        SQRT("sqrt", true),
        POWER("pow", false),
        LOG("log", false),
        ABS("abs", true),
        MIN("min", false),
        MAX("max", false);

        private final String name;
        private final boolean unary;

        FunctionType(String name, boolean unary) {
            this.name = name;
            this.unary = unary;
        }

        public String getName() {
            return name;
        }

        @Override
        public boolean isUnary() {
            return unary;
        }

        @Override
        public boolean isBinary() {
            return !isUnary();
        }

        public boolean isManyArgs() {
            return isBinary();
        }

        @Override
        public double eval(double... values) {
            switch (this) {
                case LOG: if (values.length == 2) return Math.log(values[1] / Math.log(values[0]));
                case COS: if (values.length == 1) return Math.cos(values[0]);
                case MAX: if (values.length > 0) return Collections.max(DoubleStream.of(values).boxed().collect(Collectors.toList()));
                case MIN: if (values.length > 0) return Collections.min(DoubleStream.of(values).boxed().collect(Collectors.toList()));
                default: throw new RuntimeException();
            }
        }

        public static FunctionType forFunction(String name) throws Exception{
            return EnumSet.allOf(FunctionType.class)
                    .stream()
                    .filter(e->e.getName().equalsIgnoreCase(name))
                    .findFirst()
                    .orElseThrow(Exception::new);
        }

        @Override
        public String toString() {
            return name;
        }
    }

    private void clearBuffer() {
        buff.setLength(0);
    }

    private Character prev() {
        pos--;
        return peek(0);
    }

    private Character next() {
        pos++;
        return peek(0);
    }

    private Character peek(int relativePosition) {
        final int position = pos + relativePosition;
        if (position >= length) return '\0';
        if (position <= 0) return input.charAt(0);
        return input.charAt(position);
    }

    private void createNewOperand(OperatorType operatorType, Stack<Double> operands) {
        double result;
        if (operatorType.isUnary()) {
            result = operatorType.eval(operands.pop());
        } else {
            result = operatorType.eval(operands.pop(), operands.pop());
        }
        operands.push(result);
    }

    private void createNewFunction(FunctionType functionType, Stack<Double> operands, double... args) {
        double result = functionType.eval(args);
        operands.push(result);
    }

    private boolean isUnary(Character curr) {
        return ((curr.equals('+') || curr.equals('-')) &&
                (curr.equals((peek(-pos))) && pos == 0) ||
                (!Character.isDigit(peek(-1)) &&
                (!peek(-1).equals(')')) &&
                (!peek(-1).equals('.')) &&
                (!peek(-1).equals('!'))));
    }

    private boolean isOperatorChar(char current) {
        return ALLOWED_OPERATOR_CHARS.indexOf(current) != -1;
    }

    public double parse() {
        boolean afterOperand = false;
        final Stack<Expression> expressions = new Stack<>();
        final Stack<Double> operands = new Stack<>();
        while (pos < length) {
            Character current = peek(0);

            if (Character.isWhitespace(current)) {
                next();
            }
            else if (current.equals('(')) {
                expressions.push(OperatorType.LPAREN);
            }
            else if (current.equals(',')) {
                expressions.push(OperatorType.COMMA);
            }
            else if (current.equals(')')) {
                Expression expr = null;
                int requiredArgumentsCount = 1;
                while (!expressions.isEmpty() && (expr = expressions.pop()) != OperatorType.LPAREN) {
                    if (expr.equals(OperatorType.COMMA)) {
                        requiredArgumentsCount++;
                        continue;
                    }
                    if (expr instanceof OperatorType) {
                        createNewOperand((OperatorType) expr, operands);
                    } else {
                        throw new RuntimeException("Invalid token or operation: " + current);
                    }
                }
                if ((expr = expressions.peek()) instanceof FunctionType) {
                    boolean manyArgs = ((FunctionType) (expr = expressions.pop())).isManyArgs();
                    if (manyArgs && requiredArgumentsCount > 1) {
                        double[] args = new double[requiredArgumentsCount];
                        for (int i = requiredArgumentsCount - 1; i >= 0; i--) {
                            args[i] = operands.pop();
                        }
                        createNewFunction((FunctionType) expr, operands, args);
                    } else {
                        createNewFunction((FunctionType) expr, operands, operands.pop());
                    }
                }
            }
            else if (isOperatorChar(current)) {
                afterOperand = isUnary(current);
                try {
                    final OperatorType operator = OperatorType.forSymbol(current, afterOperand);
                    while (!expressions.isEmpty() && operator.getPrecedence() <= (((OperatorType) expressions.peek()).getPrecedence())) {
                        createNewOperand((OperatorType) expressions.pop(), operands);
                    }
                    expressions.push(operator);
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }
            else if (Character.isLetter(current)) {
                final StringBuilder buff = new StringBuilder();
                while (true) {
                    if (!Character.isLetter(current)) {
                        prev();
                        break;
                    }
                    buff.append(current);
                    current = next();
                }
                if (USES_CONSTANTS.containsKey(buff.toString())) {
                    operands.push(USES_CONSTANTS.get(buff.toString()));
                } else {
                    try {
                        final FunctionType function = FunctionType.forFunction(buff.toString());
                        expressions.push(function);
                    } catch(Exception e) {
                        e.printStackTrace();
                    }
                }
            }
            else if (Character.isDigit(current)){
                final StringBuilder buff = new StringBuilder();
                while (true) {
                    if (current.equals('.')) {
                        if (buff.indexOf(".") != -1) throw new RuntimeException("Invalid float number");
                    }
                    else if ("eE".indexOf(current) != -1) {
                        if ("+-".indexOf(peek(1)) == -1) {
                            throw new RuntimeException("Invalid float number");
                        }
                    }
                    else if ("+-".indexOf(current) != -1) {
                        if ("eE".indexOf(peek(-1)) == -1) {
                            prev();
                            break;
                        }
                    }
                    else if (!Character.isDigit(current)) {
                        prev();
                        break;
                    }
                    buff.append(current);
                    current = next();
                }
                if (!buff.toString().matches("\\d*\\.?\\d+(?:[eE][-+]?\\d+)?")) {
                    throw new RuntimeException("Invalid float number: " + buff.toString());
                }
                operands.push(Double.parseDouble(buff.toString()));
            } else {
                throw new RuntimeException("Incorrect symbol " + current + " in position: " + pos);
            }
            next();
        }
        while (!expressions.isEmpty()) {
            if (expressions.peek().equals(OperatorType.LPAREN) ||
                expressions.peek().equals(OperatorType.COMMA)) {
                throw new IllegalArgumentException("");
            }
            createNewOperand((OperatorType) expressions.pop(), operands);
        }
        double operand = operands.pop();
        if (!operands.isEmpty()) {
            throw new IllegalArgumentException("");
        }

        return operand;
    }

}
