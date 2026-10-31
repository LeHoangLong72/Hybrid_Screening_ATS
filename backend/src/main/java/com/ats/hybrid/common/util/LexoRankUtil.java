package com.ats.hybrid.common.util;

import java.util.ArrayList;
import java.util.List;

public class LexoRankUtil {

    public static final int MAX_RANK_LENGTH = 32;
    private static final String DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final char MIN_CHAR = '0';
    private static final char MAX_CHAR = 'z';
    private static final String DEFAULT_BUCKET = "0|";
    private static final String SUFFIX = ":";

    public static String between(String prevRank, String nextRank) {
        if (prevRank == null && nextRank == null) {
            return DEFAULT_BUCKET + "hzzzzz" + SUFFIX;
        }

        String p = clean(prevRank);
        String n = clean(nextRank);

        if (p.isEmpty() && !n.isEmpty()) {
            return DEFAULT_BUCKET + midBetween("", n) + SUFFIX;
        }
        if (!p.isEmpty() && n.isEmpty()) {
            return DEFAULT_BUCKET + generateAfter(p) + SUFFIX;
        }

        return DEFAULT_BUCKET + midBetween(p, n) + SUFFIX;
    }

    public static boolean needsRebalance(String rank) {
        return rank != null && rank.length() > MAX_RANK_LENGTH;
    }

    public static List<String> rebalanceRanks(int count) {
        List<String> ranks = new ArrayList<>(count);
        int step = (DIGITS.length() * 1000) / (count + 1);
        for (int i = 1; i <= count; i++) {
            int val = i * step;
            String base = String.format("%06x", val);
            ranks.add(DEFAULT_BUCKET + base + SUFFIX);
        }
        return ranks;
    }

    private static String clean(String rank) {
        if (rank == null) return "";
        String s = rank;
        if (s.startsWith(DEFAULT_BUCKET)) {
            s = s.substring(DEFAULT_BUCKET.length());
        }
        if (s.endsWith(SUFFIX)) {
            s = s.substring(0, s.length() - SUFFIX.length());
        }
        return s;
    }

    private static String generateAfter(String prev) {
        StringBuilder sb = new StringBuilder(prev);
        int lastIdx = prev.length() - 1;
        char lastChar = prev.charAt(lastIdx);
        int pos = DIGITS.indexOf(lastChar);
        if (pos < DIGITS.length() - 1) {
            sb.setCharAt(lastIdx, DIGITS.charAt(pos + 1));
            return sb.toString();
        }
        return prev + "h";
    }

    private static String midBetween(String prev, String next) {
        int maxLen = Math.max(prev.length(), next.length()) + 1;
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < maxLen; i++) {
            char pChar = i < prev.length() ? prev.charAt(i) : MIN_CHAR;
            char nChar = i < next.length() ? next.charAt(i) : MAX_CHAR;

            int pVal = DIGITS.indexOf(pChar);
            int nVal = DIGITS.indexOf(nChar);

            if (pVal == nVal) {
                result.append(pChar);
            } else if (nVal - pVal > 1) {
                int midVal = (pVal + nVal) / 2;
                result.append(DIGITS.charAt(midVal));
                break;
            } else {
                result.append(pChar);
                String subMid = midBetween(
                        i + 1 < prev.length() ? prev.substring(i + 1) : "",
                        i + 1 < next.length() ? next.substring(i + 1) : ""
                );
                result.append(subMid.isEmpty() ? "m" : subMid);
                break;
            }
        }
        return result.toString();
    }
}
