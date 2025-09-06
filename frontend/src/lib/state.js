// Simple localStorage-backed state for demo purposes
const STORAGE_KEY = 'homesnapper_state_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { submissions: [], wallet: { balance: 0, history: [] }, user: {}, referrals: { code: null, referredBy: null }, badges: [] };
    return JSON.parse(raw);
  } catch (e) {
    return { submissions: [], wallet: { balance: 0, history: [] }, user: {}, referrals: { code: null, referredBy: null }, badges: [] };
  }
}

function saveState(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function ensureReferralCode(state) {
  if (!state.referrals.code) {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    state.referrals.code = code;
  }
  return state;
}

function applyReferralIfPresent(state) {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref && !state.referrals.referredBy) {
    state.referrals.referredBy = ref;
    // Sign-up bonus
    state.wallet.balance += 2; // £2 bonus
    state.wallet.history.push({ id: crypto.randomUUID(), type: 'bonus', amount: 2, note: `Referral bonus from ${ref}`, at: new Date().toISOString() });
  }
  return state;
}

const Status = {
  RECEIVED: 'Received',
  IN_REVIEW: 'In Review',
  CONTACTED: 'Contacted Owner',
  CLOSED: 'Closed',
  REJECTED: 'Rejected',
};

function isDuplicateAddress(state, address) {
  if (!address) return false;
  return state.submissions.some((s) => s.address.trim().toLowerCase() === address.trim().toLowerCase());
}

function addSubmission(data) {
  const state = loadState();
  const sub = {
    id: crypto.randomUUID(),
    address: data.address,
    notes: data.notes || '',
    imageName: data.imageName || null,
    coords: data.coords || null,
    createdAt: new Date().toISOString(),
    status: Status.RECEIVED,
    history: [ { at: new Date().toISOString(), status: Status.RECEIVED } ],
    bountyMultiplier: data.bountyMultiplier || 1,
  };
  state.submissions.unshift(sub);
  saveState(state);
  return sub;
}

function advanceSubmission(id, nextStatus) {
  const state = loadState();
  const sub = state.submissions.find((s) => s.id === id);
  if (!sub) return;
  sub.status = nextStatus;
  sub.history.push({ at: new Date().toISOString(), status: nextStatus });
  // reward on closed
  if (nextStatus === Status.CLOSED) {
    const amount = 25 * (sub.bountyMultiplier || 1); // example base £25
    state.wallet.balance += amount;
    state.wallet.history.push({ id: crypto.randomUUID(), type: 'reward', amount, note: `Listing closed: ${sub.address}`, at: new Date().toISOString() });
  }
  saveState(state);
}

function withdraw(amount, method) {
  const state = loadState();
  if (state.wallet.balance < amount) return false;
  state.wallet.balance -= amount;
  state.wallet.history.push({ id: crypto.randomUUID(), type: 'withdrawal', amount: -amount, note: `Withdrawal via ${method}`, at: new Date().toISOString() });
  saveState(state);
  return true;
}

export {
  loadState,
  saveState,
  ensureReferralCode,
  applyReferralIfPresent,
  isDuplicateAddress,
  addSubmission,
  advanceSubmission,
  withdraw,
  Status,
}

